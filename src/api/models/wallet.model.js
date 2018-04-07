const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
 * Wallet Schema
 * @private
 */
const walletSchema = new mongoose.Schema({
  walletName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});
 /*
 * Methods
 */
walletSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'walletName', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    transformed['balance'] = 100000;
    return transformed;
  },

});


/**
 * @typedef Wallet
 */
module.exports = mongoose.model('Wallet', walletSchema);
