const util = require('util');



exports.authorize = async (req, res) => {
  const client = { name: req.oauth2.client.name, id: req.oauth2.client._id }
  return res.json({transactionId: req.oauth2.transactionID, client });
};
