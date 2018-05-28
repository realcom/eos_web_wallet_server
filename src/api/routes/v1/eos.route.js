const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/eos.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  requestFaucet,
  newTransaction,
  getBalance,
  getBalances
  } = require('../../validations/eos.validation');
const router = express.Router();

router
  .route('/request_faucet')
  .post(authorize(LOGGED_USER), validate({}), controller.requestFaucet);

router
  .route('/transaction/:transactionId')
  .get(validate({}), controller.getTransaction);

router
  .route('/transaction')
  .post(authorize(LOGGED_USER), validate(newTransaction), controller.newTransaction);

router
  .route('/balance')
  .get(validate(getBalance), controller.getBalance);

router
  .route('/balances')
  .get(validate(getBalances), controller.getBalances);

module.exports = router;
