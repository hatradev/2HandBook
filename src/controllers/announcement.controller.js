const Account = require("../models/account.model");
const Announcement = require("../models/announcement.model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../utils/mongoose");

class announceController {
  // [GET] announcement
  getNewAnnouncement = (req, res, next) => {
    try {
      res.render("admin_announcement");
    } catch (err) {
      next(err);
    }
  };

  // [POST] announcement/post
  postNewAnnouncement = async (req, res, next) => {
    try {
      let ntitle = req.body.title;
      let ncontent = req.body.content;
      let nrecipient = req.body.recipient;

      const newAnnouncement = new Announcement({
        title: ntitle,
        recipient: nrecipient,
        content: ncontent,
      });

      await newAnnouncement.save();

      console.log(req.body);
      res.redirect("/announcement/all");
    } catch (err) {
      next(err);
    }
  };

  // [GET] announcement/all
  getAllAnnouncement = async (req, res, next) => {
    try {
      let page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));

      const limit = 10;

      const announcements = await Announcement.find()
        .sort({ time: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      res.locals._numberOfItems = await Announcement.find().countDocuments();
      res.locals._limit = limit;
      res.locals._currentPage = page;
      res.render("admin_all_announcement", {
        announcements: mutipleMongooseToObject(announcements),
      });
    } catch (err) {
      next(err);
    }
  };

  // Thông báo cho người dùng
  // [GET] /announcement/list
  getListAnnouncement = async (req, res, next) => {
    try {
      const announcements = await Announcement.find({
        $or: [{ recipient: "Everyone" }, { recipient: req.user.role + "s" }],
      }).sort({ time: -1 });
      if (req.session.readAnnounce.length < announcements.length) {
        for (
          let i = 0;
          i < announcements.length - req.session.readAnnounce.length;
          i++
        ) {
          req.session.readAnnounce.unshift(1);
        }
      }
      const readArr = req.session.readAnnounce;
      res.json({ announcements, readArr });
    } catch (err) {
      next(err);
    }
  };

  // [POST] /announcement/list/:idx
  updateListAnnouncement = async (req, res, next) => {
    try {
      req.session.readAnnounce[req.params.idx] = 0;
      const readArr = req.session.readAnnounce;
      await Account.updateOne({ _id: req.user._id }, { readAnnounce: readArr });
      res.json(readArr);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new announceController();
