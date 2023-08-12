const express = require("express");
const announceController = require("../controllers/announcement.controller");

const router = express.Router();

router.get("/", announceController.getNewAnnouncement);
router.post("/post", announceController.postNewAnnouncement);
router.get("/all", announceController.getAllAnnouncement);
router.get("/list", announceController.getListAnnouncement);
router.post("/list/:idx", announceController.updateListAnnouncement);

module.exports = router;
