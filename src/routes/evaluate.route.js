const express = require("express");
const evaluateController = require("../controllers/evaluate.controller");
const acccountController = require("../controllers/account.controller");
const accountController = require("../controllers/account.controller");
const router = express.Router();

router.use(acccountController.isLoggedIn);
// ######################## BUYER #########################
router.put("/specific-product/:id/report", evaluateController.reportEvaluate);
router.post("/specific-product/:id/create", evaluateController.createEvaluate);
router.post("/order-success/:_id", evaluateController.evaluateAndRating);
// #########################################################
router.use(accountController.isSeller);
// ######################## SELLER #########################
router.get("/review", evaluateController.showEvaluate);
router.post("/review/:id/reply", evaluateController.replyEvaluate);
// #########################################################
router.use(acccountController.isAdmin);
// ######################### ADMIN ##########################
// router.get('/all', evaluateController.getAllEvaluate);
// router.get('/reported', evaluateController.getReportedEvaluate);
// router.post('/remove', evaluateController.deleteEvaluate);

module.exports = router;
