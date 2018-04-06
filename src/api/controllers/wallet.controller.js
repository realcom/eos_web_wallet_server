const httpStatus = require('http-status');
const { omit } = require('lodash');
const Wallet = require('../models/wallet.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const wallets = await user.wallets.list(req.query);
    const transformedWallets = wallets.map(wallet => wallet.transform());
    res.json(transformedWallets);
  } catch (error) {
    next(error);
  }
};