const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/wallet.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
    listWallets,
    createWallet,
  } = require('../../validations/wallet.validation');
const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
// router.param('walletname', controller.load);


router
  .route('/')
  .get(authorize(LOGGED_USER), validate(listWallets), controller.list)

// router
//   .rout('/create')
//   .post(authorize(LOGGED_USER), validate(createWallet), controller.create)




module.exports = router;
