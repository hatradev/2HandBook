const Account = require('../models/account.model');
const passport = require('passport');
const { render } = require('../utils/renderPage');
const { sendForgotPasswordMail } = require('../utils/mail');
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
      res.render('sign-up');
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/my-profile
  getMyProfile = async (req, res, next) => {
    try {
      res.render('profile_updating');
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/my-order-pending
  getMyOrderPending = async (req, res, next) => {
    try {
      res.render('my_order_inConfirmation');
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/my-order-cancelled
  getMyOrderCancelled = async (req, res, next) => {
    try {
      res.render('my_order_canceled');
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/my-order
  getMyOrder = async (req, res, next) => {
    try {
      res.render('my_order');
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/become-seller
  getBecomeSeller = async (req, res, next) => {
    try {
      res.render('become_seller');
    } catch (err) {
      next(err);
    }
  };

  // [GET] account/sign-in
  getSignIn = async (req, res, next) => {
    try {
      res.render('sign-in');
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

  // [GET] account/forgot
  showForgotPassword = (req, res, next) => {
    res.render('forgot-password');
  };

  // [POST] acccount/forgot
  forgotPassword = async (req, res, next) => {
    let email = req.body.email;
    // Check email tồn tại
    let user = await Account.findOne({ email: email });
    if (user) {
      // Tạo link
      const { sign } = require('../utils/jwt');
      const host = req.header('host');
      const resetLink = `${req.protocol}://${host}/account/reset?token=${sign(
        email
      )}&email=${email}`;
      // Gửi mail
      sendForgotPasswordMail(user, host, resetLink)
        .then((result) => {
          console.log('Email has been sent');
          return res.render('forgot-password', { done: true });
        })
        .catch((error) => {
          console.log(error.statusCode);
          return res.render('forgot-password', {
            message:
              'An error has occured when sending to your email address. Please check your email address!',
          });
        });
      // Thông báo thành công
      return res.render('forgot-password', { done: true });
    } else {
      // Ngược lại, thông báo email k tồn tại
      return res.render('forgot-password', {
        message: 'Email does not exist!',
      });
    }
  };

  showResetPassword = (req, res) => {
    let email = req.query.email;
    let token = req.query.token;
    let { verify } = require('../utils/jwt');
    if (!token || !verify(token)) {
      return res.render('reset-password', { expired: true });
    } else {
      return res.render('reset-password', { email, token });
    }
  };

  resetPassword = async (req, res) => {
    let email = req.body.email;
    let token = req.body.token;
    let bcrypt = require('bcrypt');
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSalt(8));
    await Account.updateOne({ email: email }, { password: password });
    res.render('reset-password', { done: true });
  };
}

module.exports = new productController();
