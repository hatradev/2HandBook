const Account = require('../models/account.model');
const passport = require('passport');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class productController {
  // [GET] account/sign-up
  showSignUp = async (req, res, next) => {
    try {
      res.render('sign-up');
    } catch (err) {
      next(err);
    }
  };

  // [POST] account/sign-up
  signUp = async (req, res, next) => {
    try {
      const formData = req.body;
      const account = await Account(formData);
      account.save();
      res.render('sign-in', {
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
        loginMessage: req.flash('loginMessage'),
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/sign-in
  signIn = async (req, res, next) => {
    let keepSignedIn = req.body.keepSignedIn;
    // console.log(req.body.email);
    passport.authenticate('local-login', (error, user) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.redirect('/account/sign-in');
      }
      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null;
        return res.redirect('/');
      });
    })(req, res, next);
  };
}

module.exports = new productController();
