const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.get('/sign-up', accountController.getSignUp);
router.get('/sign-in', accountController.getSignIn);
router.post('/save', accountController.saveAccount);

module.exports = router;
