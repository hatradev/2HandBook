const express = require('express');
const announceController = require('../controllers/announcement.controller');

const router = express.Router();

router.get('/', announceController.createNewAnnouncement);
router.post('/post', announceController.saveNewAnnouncement);
router.get('/view', announceController.getAllAnnouncement);
// router.get('/view/:id', announceController.getAnnouncement);

module.exports = router;
