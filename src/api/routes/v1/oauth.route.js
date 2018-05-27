const express = require('express');
const validate = require('express-validation');
const oauth2orize = require('oauth2orize');
const passport = require('passport');

const controller = require('../../controllers/oauth.controller');
const OauthClient = require('../../models/oauthClient.model');
const AccessToken = require('../../models/accessToken.model');
const AuthorizationCode = require('../../models/authorizationCode.model');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const utils = require('../../utils');
const cleos = require('../../services.cleos');

const router = express.Router();


const server = oauth2orize.createServer();
server.grant(oauth2orize.grant.code(async (client, redirectUri, user, ares, done) => {
  let code = utils.getUid(16);
  try {
    const authorizationCode = new AuthorizationCode({code, client, redirectUri, user});
    await authorizationCode.save();
    return done(null, code);
  } catch(error) {
    console.error(error);
    done(error);
  }
}));

server.exchange(oauth2orize.exchange.code(async (client, code, redirectUri, done) => {
  try {
    const authorizationCode = await AuthorizationCode.findOne({code: code}).exec();
    if (!authorizationCode.client.equals(client._id)) { return done(null, false); }
    // if (redirectUri !== authorizationCode.redirectUri) { return done(null, false); }
    console.log(authorizationCode.user);
    console.log(authorizationCode.client);
    const token = utils.getUid(256);
    const at = new AccessToken({token, user: authorizationCode.user, client: authorizationCode.client, });
    await at.save();
    return done(null, at);
  } catch(error) {
    console.error(error);
    done(error);
  }

}));


server.serializeClient(function(client, done) {

  console.log('serializeClient');
  console.log(client)
  return done(null, client.id);
});

server.deserializeClient(async (id, done) => {
  try {
    const client = await OauthClient.findOne({_id: id});
    console.log('deserializeClient');
    console.log(client)
    return done(null, client);
  } catch(error) {
    return done(error);
  }
});


router.route('/transaction')
  .get(validate({}), authorize(LOGGED_USER), server.authorize(async (clientId, redirectUri, done) => {
    try {
      const client = await OauthClient.findOne({_id: clientId});
      if (!client) { return done(null, false); }
      if (client.redirectUri !== redirectUri) return done(null, false);
      return done(null, client, redirectUri);
    } catch(error) {
      return done(error);
    }
  }), controller.authorize);

router.route('/authorize')
  .post(validate({}), authorize(LOGGED_USER), server.decision());


router.route('/token')
  .post(validate({}),
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler());


router.route('/me')
  .get(
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json({id: req.user.account, email: req.user.email, account: req.user.account });
  });


router.route('/transfer_token')
  .post(
    passport.authenticate('bearer', { session: false }),
    async (req, res) => {
      const { wallet, to, quantity } = req.body;
      const from = req.user.account;
      const transaction = await cleos.newTransaction(from, to, quantity, wallet);
      res.json({success: true, transaction });
    });
module.exports = router;


