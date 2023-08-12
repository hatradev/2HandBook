const express = require('express');
const accountController = require('../controllers/account.controller');
const { body, getErrorMessage } = require('../middleware/validation');

const router = express.Router();

router.get('/sign-up', accountController.getSignUp);
router.post('/sign-up', accountController.signUp);
router.get('/sign-in', accountController.getSignIn);
router.post(
  '/sign-in',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Invalid email address!'),
  body('password').trim().notEmpty().withMessage('Password is required!'),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.render('sign-in', { loginMessage: message });
    }
    next();
  },
  accountController.signIn
);
router.get('/forgot', accountController.showForgotPassword);
router.post('/forgot', accountController.forgotPassword);
// Middleware dùng để check login, các route cần login phải nằm dưới nó
router.use(accountController.isLoggedIn);
// ################################################
router.get('/sign-out', accountController.signOut);
router.post('/my-profile/:_id/update', accountController.updateMyProfile);
router.get('/my-profile/:_id', accountController.getMyProfile);

// router.get('/my-profile', accountController.getMyProfile);
// router.get('/my-order-pending', accountController.getMyOrderPending);
// router.get('/my-order-cancelled', accountController.getMyOrderCancelled);
router.get('/my-order/:_id', accountController.getMyOrder);
router.post(
  '/become-seller/:_id/register-seller',
  accountController.registerSeller
);
router.get('/become-seller/:_id', accountController.getBecomeSeller);

// ############### ADMIN ####################
router.get('/all', accountController.getAllAccount);
router.get('/banned', accountController.getBannedAccount);
router.get('/pending', accountController.getPendingAccount);
router.get('/reported', accountController.getReportedAccount);
router.post('/exec-account', accountController.executeAccount);
module.exports = router;
