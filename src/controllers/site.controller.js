const Product = require("../models/product.model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../utils/mongoose");
class SiteController {
  // [GET] /
  getHome = async (req, res, next) => {
    try {
      const products = await Product.find({ isTrend: true });
      // console.log(req.session.cookie);
      console.log(req.session.touch());
      // console.log(req.session.cookie.maxAge);
      console.log(req.user);
      res.render("home", {
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  };
  getAboutUs = (req, res) => {
    res.render("about-us");
  };
}

module.exports = new SiteController();
