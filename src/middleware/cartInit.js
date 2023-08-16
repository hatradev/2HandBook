const Account = require("../models/account.model");
const Product = require("../models/product.model");
const { mongooseToObject } = require("../utils/mongoose");
async function initCart(req, res, next) {
  try {
    // Nếu người dùng đã đăng nhập thì đồng nhất giỏ hàng ở trong session với lại giỏ hàng ở trong user sau đó update DB
    if (req.user) {
      // Tạo deep copy
      reqUserCart = JSON.parse(JSON.stringify(req.user.cart));
      reqSessionCart = JSON.parse(JSON.stringify(req.session.cart));
      reqUserCart.forEach(async (eleUser, idxUser) => {
        let isFound = false;
        reqSessionCart.forEach((eleSess, idxSess) => {
          if (eleUser._id == eleSess._id) {
            if (eleUser.quantity != eleSess.quantity) {
              let maxQuantity = Math.max(
                req.user.cart[idxUser].quantity,
                req.session.cart[idxSess].quantity
              );
              req.user.cart[idxUser].quantity = maxQuantity;
              req.session.cart[idxSess].quantity = maxQuantity;
            }
            isFound = true;
            return;
          }
        });
        if (!isFound) {
          let productInfo = await Product.findById(eleUser._id);
          productInfo = mongooseToObject(productInfo);
          productInfo.quantity = eleUser.quantity;
          req.session.cart.push(productInfo);
        }
      });

      // console.log("CART session: ", req.session.cart);

      reqSessionCart.forEach(async (eleSess, idxSess) => {
        let isFound = false;
        reqUserCart.forEach((eleUser, idxUser) => {
          if (eleUser._id == eleSess._id) {
            isFound = true;
            return;
          }
        });
        if (!isFound) {
          req.user.cart.push({
            _id: eleSess._id,
            quantity: eleSess.quantity,
          });
        }
        await Account.findOneAndUpdate(
          { _id: req.user._id },
          { cart: req.user.cart }
        );
      });
      let cart = req.session.cart;
      res.locals._cartNumber = cart.reduce(
        (accum, product) => accum + product.quantity,
        0
      );
      // console.log("CART user: ", req.user.cart);
    }
  } catch (err) {
    next(err);
  }
}
module.exports = initCart;
