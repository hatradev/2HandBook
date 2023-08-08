const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();

router.get('/manage-order', orderController.showAllOrder);
router.put('/manage-order/:id/reject', orderController.rejectOrder);
router.put('/manage-order/:id/accept', orderController.acceptOrder);

module.exports = router;
