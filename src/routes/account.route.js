const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.get('/sign-up', accountController.getSignUp);
router.get('/sign-in', accountController.getSignIn);
router.post('/sign-up', accountController.signUp);
router.get('/my-profile', accountController.getMyProfile);
router.get('/my-order-pending', accountController.getMyOrderPending);
router.get('/my-order-cancelled', accountController.getMyOrderCancelled);
router.get('/my-order', accountController.getMyOrder);
router.get('/become-seller', accountController.getBecomeSeller);




module.exports = router;
