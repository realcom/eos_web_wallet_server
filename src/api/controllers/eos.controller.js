const util = require('util');
import cleos from '../services/cleos';

exports.transfer = async (req, res, next) => {
  return next();
}

exports.requestFaucet = async (req, res, next) => {
  const { user } = req;
  try {
    const transaction = await cleos.requestFaucet(user.account, 5.00);
    res.json({success: true, transaction });
  } catch (error) {
    return next(error);
  }
}


exports.getTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await cleos.getTransaction(transactionId);
    res.json({success: true, transaction });
  } catch (error) {
    return next(error);
  }
}


exports.newTransaction = async (req, res, next) => {
  try {
    const { wallet, to, quantity } = req.body;
    console.log(quantity);
    const from = req.user.account;
    const transaction = await cleos.newTransaction(from, to, quantity, wallet);
    res.json({success: true, transaction });
  } catch (error) {
    return next(error);
  }
}
