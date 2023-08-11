const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();

router.get('/manage-order', orderController.showAllOrder);
router.put('/manage-order/:id/reject', orderController.rejectOrder);
router.put('/manage-order/:id/accept', orderController.acceptOrder);
router.get('/payment/:_id', orderController.getPayment);
router.get('/payment-for-cart', orderController.getPayForCart);
router.post('/payment-placeOrder/:_id', orderController.placeOrder);
router.post('/payment-placeOrderForCart', orderController.placeOrderForCart);



module.exports = router;
