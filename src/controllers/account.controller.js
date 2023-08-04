const createError = require('http-errors');
const Account = require('../models/account.model');
const passport = require('passport');
const { render } = require('../utils/renderPage');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class productController {
  // [GET] account/sign-up
  showSignUp = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        return res.redirect('/account/profile');
      }
      res.render('sign-up', {
        registerMessage: req.flash('registerMessage'),
        reqUrl: req.query.reqUrl,
      });
    } catch (err) {
      next(err);
    }
  };

  // [POST] account/sign-up
  signUp = async (req, res, next) => {
    // let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/account/sign-in';
    passport.authenticate('local-register', (error, user) => {
      if (error) {
        return next(error);
      }
      // Đăng kí không thành công, load lại trang đăng kí
      console.log(user);
      if (!user) {
        console.log('Đăng kí không thành công');
        return res.redirect(`/account/sign-up`);
      } else {
        // Đăng kí thành công
        res.redirect('/account/sign-in');
      }
    })(req, res, next);
  };

  // [GET] account/sign-in
  showSignIn = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        return res.redirect('/account/profile');
      }
      res.render('sign-in', {
        loginMessage: req.flash('loginMessage'),
        reqUrl: req.query.reqUrl,
      });
    } catch (err) {
      next(err);
    }
  };

  // [POST] account/sign-in
  signIn = async (req, res, next) => {
    let keepSignedIn = req.body.keepSignedIn;
    let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/account/profile';
    console.log('keepSignedIn:', keepSignedIn);
    passport.authenticate('local-login', (error, user) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        // Xác thực thất bại
        return res.redirect(`/account/sign-in?reqUrl=${reqUrl}`);
      }
      req.logIn(user, (error) => {
        if (error) {
          // Đăng nhập thất bại
          return next(error);
        }
        // Đăng nhập thành công
        req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null;
        return res.redirect(reqUrl);
      });
    })(req, res, next);
  };

  isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect(`/account/sign-in?reqUrl=${req.originalUrl}`);
  };

  // [GET] account/profile
  showProfile = async (req, res, next) => {
    try {
      render(req, res, 'profile_updating');
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/sign-out
  signOut = async (req, res, next) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }
      res.redirect('/');
    });
  };
}

module.exports = new productController();
