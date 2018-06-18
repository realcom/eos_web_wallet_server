const httpStatus = require('http-status');
const { omit } = require('lodash');
const axios = require('axios');

const cleos = require('../services/cleos');
const Wallet = require('../models/wallet.model');
const { handler: errorHandler } = require('../middlewares/error');
/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const { user } = req;
    const wallets = await Wallet.find({ user: user }).exec();
    const transformedWallets = wallets.map(wallet => wallet.transform());
    res.json({ wallets: transformedWallets });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


exports.create = async (req, res, next) => {
  try {
    const { user } = req;
    const walletName = `${user.account}_${req.body.walletName}`;
    const result = await cleos.createWallet(walletName);
    const password = result.data;
    const wallet = new Wallet({ walletName, user: user._id });
    await wallet.save();
    res.json({ password });
  } catch (error) {
    next(error);
  }
};


