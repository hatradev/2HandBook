const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();

router.get('/manage-order', orderController.showAllOrder);
router.delete('/manage-order/delete', orderController.deleteOrder);

module.exports = router;
