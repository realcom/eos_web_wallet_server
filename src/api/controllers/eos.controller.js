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
    const { to, quantity, symbol, memo, wallet } = req.body;
    const from = req.user.account;
    const transaction = await cleos.newTransaction(from, to, quantity, symbol, memo, wallet);
    res.json({success: true, transaction });
  } catch (error) {
    return next(error);
  }
}


exports.getBalance = async (req, res, next) => {
  try {
    const { accountName, symbol } = req.query;
    const balance = await cleos.getBalance(accountName, symbol);
    res.json({success: true, balance });
  } catch (error) {
    return next(error);
  }
}



exports.getBalances = async (req, res, next) => {
  try {
    const { accountName } = req.query;
    const balances = await cleos.getBalances(accountName);
    res.json({success: true, balances });
  } catch (error) {
    return next(error);
  }
}
