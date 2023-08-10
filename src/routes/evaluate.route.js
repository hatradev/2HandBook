const express = require('express');
const evaluateController = require('../controllers/evaluate.controller');
const router = express.Router();

router.put('/specific-product/:id/report', evaluateController.reportEvaluate);
router.post('/specific-product/:id/create', evaluateController.createEvaluate);
router.post('/order-success/:_id', evaluateController.evaluateAndRating);

router.get('/review', evaluateController.showEvaluate);
router.post('/review/:id/reply', evaluateController.replyEvaluate);

module.exports = router;
