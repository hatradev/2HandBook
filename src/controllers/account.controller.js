const Account = require('../models/account.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class productController {
  // [GET] account/sign-up
  getSignUp = async (req, res, next) => {
    try {
      res.render('sign-up', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/sign-in
  getSignIn = async (req, res, next) => {
    try {
      res.render('sign-in', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [POST] account/sign-in
  saveAccount = async (req, res, next) => {
    try {
      const formData = req.body;
      const account = Account(formData);
      account.save();
      res.render('sign-in', {
        showHeader: true,
        showFooter: true,
        successMessage: true,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new productController();
