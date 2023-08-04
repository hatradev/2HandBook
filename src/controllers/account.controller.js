const createError = require('http-errors');
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

  // [GET] account/my-profile
  getMyProfile = async (req, res, next) => {
    try {
      res.render('profile_updating', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/my-order-pending
  getMyOrderPending = async (req, res, next) => {
    try {
      res.render('my_order_inConfirmation', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/my-order-cancelled
  getMyOrderCancelled = async (req, res, next) => {
    try {
      res.render('my_order_canceled', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/my-order
  getMyOrder = async (req, res, next) => {
    try {
      res.render('my_order', {
        showHeader: true,
        showFooter: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/become-seller
  getBecomeSeller = async (req, res, next) => {
    try {
      res.render('become_seller', {
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

  // [POST] account/sign-up
  signUp = async (req, res, next) => {
    try {
      const formData = req.body;
      const isExists = await Account.findOne({ email: formData.email });
      if (isExists) {
        throw createError.Conflict(`This email already exists`);
      }
      const account = Account(formData);
      account.save();
      res.redirect('/account/sign-in');
    } catch (err) {
      next(err);
    }
  };

  // [POST] account/sign-in
  signIn = async (req, res, next) => {
    try {
      // res.render('sign-in', {
      //   showHeader: true,
      //   showFooter: true,
      //   successMessage: true,
      // });
    } catch (err) {
      next(err);
    }
  };
}



module.exports = new productController();
