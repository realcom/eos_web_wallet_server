const mongoose = require('mongoose');


/**
 * Wallet Schema
 * @private
 */
const oauthClientSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  clientSecret: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  isTrusted: Boolean,
  redirectUri: [String],
}, {
  timestamps: true,
});


/**
 * @typedef Wallet
 */
module.exports = mongoose.model('OauthClient', oauthClientSchema);
