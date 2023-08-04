const express = require('express');
const accountController = require('../controllers/account.controller');
const { body, getErrorMessage } = require('../middleware/validation');

const router = express.Router();

router.get('/sign-up', accountController.showSignUp);
router.post('/sign-up', accountController.signUp);
router.get('/sign-in', accountController.showSignIn);
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
router.use(accountController.isLoggedIn);
router.get('/profile', accountController.showProfile);
router.get('/sign-out', accountController.signOut);

module.exports = router;
