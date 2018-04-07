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
    const wallets = await Wallet.find({user: user}).exec();
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
    const walletName = req.body.walletName;
    console.log(walletName)
    const result = await axios.post(url, `"${walletName}"`, {
      headers: { 'Content-Type': 'text/plain' },
    });
    const wallet = new Wallet({walletName, user: user._id});
    await wallet.save();
    const password = result.data;
    res.json({ password });
  } catch (error) {
    console.error(error)
    next(error);
  }
};
