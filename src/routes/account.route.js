const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.get('/sign-up', accountController.showSignUp);
router.post('/sign-up', accountController.signUp);
router.get('/sign-in', accountController.showSignIn);
router.post('/sign-in', accountController.signIn);

module.exports = router;
