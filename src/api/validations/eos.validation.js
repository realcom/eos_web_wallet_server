const Joi = require('joi');

module.exports = {
  // GET /v1/users
  requestFaucet: {
    body: {

    },
  },
  newTransaction: {
    body: {
      to: Joi.string().required(),
      wallet: Joi.string().required(),
      quantity: Joi.number().required(),
    }
  }
}
