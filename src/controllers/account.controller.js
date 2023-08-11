const Account = require('../models/account.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const { sendForgotPasswordMail } = require('../utils/mail');
const bcrypt = require('bcrypt');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
const mongoose = require('../utils/mongoose');
class acccountController {
  // [GET] account/sign-up
  getSignUp = async (req, res, next) => {
    try {
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
  getSignIn = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        return res.redirect('/account/my-profile');
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
    let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/account/my-profile';
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
        // Get the account ID from the logged-in user
        const accountId = user._id; // Adjust this to match your account model field name

        // Append the account ID as a slug to the "reqUrl"
        const redirectUrl = `${reqUrl}/${accountId}`;
        req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null;
        return res.redirect(redirectUrl);
      });
    })(req, res, next);
  };

  isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect(`/account/sign-in?reqUrl=${req.originalUrl}`);
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
      const host = req.header('host');
      // Cập nhật mới ngẫu nhiên 1 password cho user trong database
      const { generateRandomStr } = require('../utils/function-helpers');
      // Hash mật khẩu và update vào database
      const newPassword = generateRandomStr(8);
      await Account.updateOne({
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8)),
      });
      // Gửi mail
      sendForgotPasswordMail(user, host, newPassword)
        .then((result) => {
          console.log('Email has been sent');
          // Thông báo thành công
          return res.render('forgot-password', { done: true });
        })
        .catch((error) => {
          console.log(error.statusCode);
          return res.render('forgot-password', {
            message:
              'An error has occured when sending to your email address. Please check your email address!',
          });
        });
    } else {
      // Ngược lại, thông báo email k tồn tại
      return res.render('forgot-password', {
        message: 'Email does not exist!',
      });
    }
  };

  // [GET] account/my-profile
  getMyProfile(req, res, next) {
    // res.send('my account');
    Account.findOne({ _id: req.params._id })
      .then((user) => {
        res.render('profile_updating', {
          user: mongooseToObject(user),
        });
      })
      .catch(next);
  }

  uploadAvatar = async (req, res, next) => {
    try {
      const accountId = req.user._id; // Lấy ID của người dùng đã đăng nhập
      const avatarPath = req.file.path; // Đường dẫn tới ảnh đã tải lên

      // Cập nhật đường dẫn ảnh vào MongoDB
      const updatedUser = await Account.findByIdAndUpdate(
        accountId,
        { avatar: avatarPath },
        { new: true }
      );

      // Xóa ảnh cũ nếu có
      if (req.user.avatar) {
        const oldAvatarPath = path.join(__dirname, '../', req.user.avatar);
        fs.unlinkSync(oldAvatarPath);
      }

      res.status(200).json({
        message: 'Avatar updated successfully',
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating avatar' });
    }
  };

  updateMyProfile = async (req, res, next) => {
    // res.json(req.body);
    // Account.updateOne({_id: req.params._id}, req.body);
    console.log(req.body);
    const accountId = req.params._id;
    const user = await Account.findById(accountId);

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.address;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.job = req.body.job;
    // console.log(req.body);
    res.json(req.body);
    await user.save();
    try {
      // Check if the present password matches the one in the database
      const isPasswordValid = await bcrypt.compare(
        req.body.presentPassword,
        user.password
      );
      if (!isPasswordValid) {
        req.flash('changePasswordMessage', 'Incorrect present password.');
        return res.redirect(`/account/my-profile/${req.params._id}`);
      }

      // Hash the new password and update it in the database
      const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
      user.password = hashedNewPassword;
      // console.log(user);

      // Save the updated user data to the database
      await user.save();

      req.flash('changePasswordMessage', 'Password updated successfully.');
      res.redirect(`/account/my-profile/${req.params._id}`);
    } catch (err) {
      next(err);
    }
  };

  getMyOrder = async (req, res, next) => {
    try {
      const user = await Account.findById(req.params._id);
      const accountId = user._id;
      const orders = await Order.find({
        idAccount: accountId,
        status: 'successful',
      })
        .populate('idAccount')
        .populate('detail.idProduct')
        .populate('idSeller');
      const orderObject = mutipleMongooseToObject(orders);

      // var products = [];
      // var sellers = [];
      // for (var i of orderObject) {
      //   // Object.assign(i, { idOrder: i._id });
      //   sellers.push(i);
      //   for (var j of i.detail) {
      //     Object.assign(j, { idOrder: i._id });
      //     var temp = [];
      //     temp.push(j);
      //     products.push(j);
      //     // sellers.push(j);
      //   }
      // }
      res.locals.orders = orderObject;
      // res.locals.products = products;
      // res.locals.sellers = sellers;
      res.locals.user = mongooseToObject(user);

      res.render('my_order');
    } catch (err) {
      next(err);
    }
  };

  getMyOrderPending = async (req, res, next) => {
    try {
      const user = await Account.findById(req.params._id);
      const accountId = user._id;
      const orders = await Order.find({
        idAccount: accountId,
        status: 'pending',
      })
        .populate('idAccount')
        .populate('detail.idProduct')
        .populate('idSeller');
      const orderObject = mutipleMongooseToObject(orders);

      var products = [];
      for (var i of orderObject) {
        for (var j of i.detail) {
          Object.assign(j, { idOrder: i._id });
          var temp = [];
          temp.push(j);
          products.push(j);
        }
      }
      res.locals.orders = orderObject;
      res.locals.products = products;
      res.locals.user = mongooseToObject(user);

      res.render('my_order-pending');
    } catch (err) {
      next(err);
    }
  };

  getMyOrderCancelled = async (req, res, next) => {
    try {
      const user = await Account.findById(req.params._id);
      const accountId = user._id;
      const orders = await Order.find({
        idAccount: accountId,
        status: 'cancelled',
      })
        .populate('idAccount')
        .populate('detail.idProduct')
        .populate('idSeller');
      const orderObject = mutipleMongooseToObject(orders);

      var products = [];
      for (var i of orderObject) {
        for (var j of i.detail) {
          Object.assign(j, { idOrder: i._id });
          var temp = [];
          temp.push(j);
          products.push(j);
        }
      }
      res.locals.orders = orderObject;
      res.locals.products = products;
      res.locals.user = mongooseToObject(user);

      res.render('my_order-cancelled');
    } catch (err) {
      next(err);
    }
  };

  getBecomeSeller = async (req, res, next) => {
    try {
      const accountId = req.params._id;
      const user = await Account.findById(accountId);
      // console.log(user);

      if (user.requestStatus === 'Become-seller') {
        if (user.accountStatus === 'Pending') {
          // Yêu cầu trở thành người bán đã gửi và tài khoản chưa được chấp thuận
          return res.render('become_seller-pending', {
            user: mongooseToObject(user),
            // processingMessage: 'Your request is being processed. Please wait for approval.',
          });
        } else {
          // Yêu cầu trở thành người bán đã gửi và tài khoản đã được chấp thuận
          return res.render('become_seller', {
            user: mongooseToObject(user),
            approvedMessage:
              'Congratulations! You have been approved as a seller.',
          });
        }
      }

      // Ngược lại, hiển thị trang trở thành người bán với thông tin hồ sơ của người dùng để cập nhật thông tin và yêu cầu trở thành người bán
      res.render('become_seller', {
        user: mongooseToObject(user),
      });
    } catch (err) {
      next(err);
    }
  };

  registerSeller = async (req, res, next) => {
    try {
      const accountId = req.params._id;
      const user = await Account.findById(accountId);

      user.requestStatus = 'Become-seller';
      user.accountStatus = 'Pending';
      user.address = req.body.address;
      user.job = req.body.job;
      await user.save();

      res.redirect(`/account/become-seller/${req.params._id}`);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new acccountController();
