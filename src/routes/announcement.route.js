const express = require("express");
const announceController = require("../controllers/announcement.controller");
const accountController = require("../controllers/account.controller");

const router = express.Router();
// ######################## USER #########################
router.get("/list", announceController.getListAnnouncement);
router.post("/list/:idx", announceController.updateListAnnouncement);
// #########################################################
router.use(accountController.isAdmin);
router.get("/", announceController.getNewAnnouncement);
router.post("/post", announceController.postNewAnnouncement);
router.get("/all", announceController.getAllAnnouncement);

module.exports = router;
