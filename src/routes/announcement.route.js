const express = require('express');
const announceController = require('../controllers/announcement.controller');

const router = express.Router();

router.get('/', announceController.createNewAnnouncement);
router.post('/post', announceController.saveNewAnnouncement);
router.get('/view', announceController.getAllAnnouncement);

module.exports = router;
