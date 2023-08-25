const express = require("express");
const siteController = require("../controllers/site.controller");

const router = express.Router();
router.get("/", siteController.getHome);
router.get("/about-us", siteController.getAboutUs);
router.get("/support", siteController.getSupport);

module.exports = router;
