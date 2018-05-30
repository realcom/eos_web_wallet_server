const httpStatus = require('http-status');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const Wallet = require('../models/wallet.model');
const AuthorizationCode = require('../models/authorizationCode.model');
const moment = require('moment-timezone');
const {jwtExpirationInterval} = require('../../config/vars');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const oauth2orize = require('oauth2orize');
const utils = require('../utils');

import cleos from '../services/cleos';



/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken, expiresIn,
  };
}


/* temp function wrapper for create wallet */
const createWallet = async (user, walletName, prefix=true) => {
  try {
    walletName = prefix ? `${user.account}_${walletName}` : walletName
    const result = await cleos.createWallet(walletName);
    const password = result.data;
    const wallet = new Wallet({ walletName, user: user._id });
    await wallet.save();
    console.log(wallet);
    console.log(password);
    return {password, wallet};
  } catch(error) {
    console.error(error);
    throw(error);
  }
}
/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    // create access key
    const user = await (new User(req.body)).save();
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    const [ownerPrivate, ownerPublic] = await cleos.createKey();
    const [activePrivate, activePublic] = await cleos.createKey();
    try {
      await cleos.createAccount(process.env.ROOT_BLOCK_PRODUCER, user.account,
        ownerPublic, activePublic);
      user.activePublicKey = activePublic;
      user.ownerPublicKey = ownerPublic;


      // create two wallet for each keys
      const {password: ownerWalletPassword, wallet: ownerWallet } = await createWallet(user, `owner`);
      await cleos.importKeyToWallet(ownerPrivate, ownerWallet.walletName);

      const {password: activeWalletPassword, wallet: activeWallet } = await createWallet(user, `active`);
      await cleos.importKeyToWallet(activePrivate, activeWallet.walletName);
      await cleos.importKeyToWallet(ownerPrivate, 'default');
      user.ownerWalletPassword = ownerWalletPassword;
      user.activeWalletPassword = activeWalletPassword;
      await user.save();

      res.status(httpStatus.CREATED);
      return res.json({
        token,
        user: userTransformed,
        ownerWalletPassword,
        activeWalletPassword,
        keys: {
          owner: { private: ownerPrivate, public: ownerPublic },
          active: { private: activePrivate, public: activePublic },
        },
      });
    } catch (err) {
      console.error(err);
      await user.remove();
      return next(err);
    }
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {

    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
  try {
    const {user} = req;
    const accessToken = user.token();
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};
