const hbs = require('express-handlebars');
const Announcement = require('../models/announcement.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

class announceController {
  // [GET] announcement
  createNewAnnouncement(req, res) {
    res.render('admin_announcement');
  }

  // [POST] announcement/post
  saveNewAnnouncement = async (req, res) => {
    console.log(req.body);
    res.send('');
  };

  // [GET] announcement/view
  getAllAnnouncement = async (req, res, next) => {
    try {
      const announcements = await Announcement.find();
      res.render('admin_all_announcement', {
        showHeader: true,
        showFooter: true,
        announcements: mutipleMongooseToObject(announcements),
      });
    } catch (err) {
      res.status(404).json(err);
    }
  };
}

module.exports = new announceController();
