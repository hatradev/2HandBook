const Account = require('../models/account.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class productController {
  // [GET] account/sign-up
  showSignUp = async (req, res, next) => {
    try {
      res.render('sign-up', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [POST] account/sign-up
  signUp = async (req, res, next) => {
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

  // [GET] account/sign-in
  showSignIn = async (req, res, next) => {
    try {
      res.render('sign-in', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/sign-in
  signIn = async (req, res, next) => {
    try {
      res.render('sign-in', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new productController();
