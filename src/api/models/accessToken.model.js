const mongoose = require('mongoose');


/**
 * Wallet Schema
 * @private
 */
const accessTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    maxlength: 256,
    index: true,
    trim: true,
  },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'OauthClient' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});


/**
 * @typedef Wallet
 */
module.exports = mongoose.model('AccessToken', accessTokenSchema);
