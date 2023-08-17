const Product = require("../models/product.model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../utils/mongoose");
class siteController {
  // [GET] /
  getHome = async (req, res, next) => {
    try {
      const products = await Product.find({ isTrend: true })
        .limit(6)
        .sort("timestamps: -1");
      res.render("home", {
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  };

  getAboutUs = (req, res, next) => {
    try {
      res.render("about-us");
    } catch (err) {
      next(err);
    }
  };
  getSupport = (req, res, next) => {
    try {
      res.render("support");
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new siteController();
