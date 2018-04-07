const httpStatus = require('http-status');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

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

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    // create access key



    // console.log(`${process.env.CLEOS_EXEC} create key`);
    // console.log(stderr);
    // console.log(stdout);

    // const user = await (new User(req.body)).save();
    // const userTransformed = user.transform();
    // const token = generateTokenResponse(user, user.token());

    const keyRegex = /Private key: ([a-zA-Z0-9_]*)(\s*)Public key: ([a-zA-Z0-9_]*)/g;
    console.log(keyRegex)
    var { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} create key`);
    console.log(stdout);
    console.log(keyRegex.exec(stdout));
    keyRegex.exec('abc')
    console.log(abc)
    const [a, owernerPrivate, b, ownerPublic] = keyRegex.exec(stdout);
    console.log(ownerPublic);
    var { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} create key`);
    const [c, activePrivate, d, activePublic] = keyRegex.exec(stdout);
    console.log(ownerPublic)
    console.log(activePublic)
    var { stdout, stderr } = await exec(`${process.env.CLEOS_EXEC} create account ${ownerPublic} ${activePublic}`);
    console.log(stdout);
    console.log(stderr);
    return next(error);




    res.status(httpStatus.CREATED);
    return res.json({ token, user: userTransformed });
  } catch (error) {
    console.log(error)
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
    const { user } = req;
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
