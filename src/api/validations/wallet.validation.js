const Joi = require('joi');
const User = require('../models/user.model');

module.exports = {

  listWallets: {
    query: {
    },
  },

  createWallet: {
    body: {
    //   walletName: Joi.string().min(6).max(128).required(),
    },
  },
};
