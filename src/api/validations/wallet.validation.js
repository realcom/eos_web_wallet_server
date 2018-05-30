const Joi = require('joi');

module.exports = {

  listWallets: {
    query: {
    },
  },

  createWallet: {
    body: {
      walletName: Joi.string().min(4).max(16).required(),
    },
  },
};
