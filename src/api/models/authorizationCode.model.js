const mongoose = require('mongoose');


/**
 * AuthorizationCode Schema
 * @private
 */
const authorizationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'OauthClient' },
  redirectUri: {
    type: String,
    trim: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});


/**
 * @typedef AuthorizationCode
 */
module.exports = mongoose.model('AuthorizationCode', authorizationCodeSchema);
