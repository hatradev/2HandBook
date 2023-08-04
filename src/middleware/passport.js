const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const Account = require('../models/account.model');

// Ham nay duoc goi khi xac thuc thanh cong va luu thong tin user vao session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Ham duoc goi boi passport.session de lay thong tin cua user tu csdl va dua vao req.user
passport.deserializeUser(async (id, done) => {
  try {
    let user = await Account.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Ham xac thuc nguoi dung khi dang nhap
passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email', // Ten dang nhap la email
      passwordField: 'password',
      passReqToCallback: true, // Cho phep truyen req vao call
    },
    async (req, email, password, done) => {
      console.log(req.user, email, password, done);
      if (email) {
        email = email.toLowerCase(); // Chuyen email thanh ki tu thuong
      }
      try {
        if (!req.user) {
          // User chua dang nhap
          let user = await Account.findOne({ email: email }).exec();
          console.log(user);
          if (!user) {
            // Neu email chua ton tai
            return done(
              null,
              false,
              req.flash('loginMessage', 'Email does not exist!')
            );
          }
          // if (bcrypt.compareSync(password, user.password)) {
          if (password != user.password) {
            // Sai mat khau
            return done(
              null,
              false,
              req.flash('loginMessage', 'Invalid username or password')
            );
          }
          console.log('Mat khau OK');
          // Cho phep dang nhap
          return done(null, user);
        }
        // Bo qua dang nhap
        return done(null, req.user);
      } catch (error) {
        console.log('Something goes wrong!!');
        return done(error);
      }
    }
  )
);

// Hàm đăng kí tài khoản
// passport.use(
//   'local-register',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//       passReqToCallback: true,
//     },
//     async (req, email, password, done) => {
//       if (email) {
//         email = email.toLowerCase();
//       }
//       if (req.user) {
//         // Nếu người dùng đã đăng nhập, bỏ qua
//         return done(null, req.user);
//       }
//       try {
//         let user = await Account.findOne({ email });
//         if (user) {
//           // Nếu email đã tồn tại
//           return done(
//             null,
//             false,
//             req.flash('registerMessage', 'Email is already taken!')
//           );
//         }
//         let formData = req.body;
//         formData.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
//         user = await Account(formData);
//         user.save();
//         done(
//           null,
//           false,
//           req.flash(
//             'registerMessage',
//             'You have registered successfully. Please login'
//           )
//         );
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

module.exports = passport;
