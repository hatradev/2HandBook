const express = require('express');
const evaluateController = require('../controllers/evaluate.controller');
const router = express.Router();

router.put('/specific-product/:id/report', evaluateController.reportEvaluate);
router.post('/specific-product/:id/create', evaluateController.createEvaluate);

router.get('/review', evaluateController.showEvaluate);
router.post('/review/:id/reply', evaluateController.replyEvaluate);

//ADMIN
// router.get('/all', evaluateController.getAllEvaluate);
// router.get('/reported', evaluateController.getReportedEvaluate);
// router.post('/remove', evaluateController.deleteEvaluate);

module.exports = router;
