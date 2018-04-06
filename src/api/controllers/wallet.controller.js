const httpStatus = require('http-status');
const { omit } = require('lodash');
const Wallet = require('../models/wallet.model');
const { handler: errorHandler } = require('../middlewares/error');
const axios = require('axios');


/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    // console.log(req)
    const user = req.user;
    const wallets = await user.wallets;
    const transformedWallets = wallets.map(wallet => wallet.transform());
    res.json({wallets: transformedWallets});
  } catch (error) {
    console.error(error)
    next(error);
  }
};


exports.create = async (req, res, next) => {
  try {
    const user = req.user;
    const url = `${process.env.CLEOS_HTTP_ENDPOINT}/v1/wallet/create`
    const walletName = req.body.walletName
    console.log(walletName)
    const result = await axios.post(url, `"${walletName}"`, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const wallet = new Wallet();
    wallet.walletName = walletName
    user.wallets.push(wallet);
    await wallet.save();
    console.log(wallet);
    const password = result.data;
    res.json({ password });
  } catch (error) {
    console.error(error)
    next(error);
  }
};
