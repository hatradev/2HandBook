const { formatCurrency } = require("../helpers/handlebars");
const Product = require("../models/product.model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../utils/mongoose");
class siteController {
  // [GET] /
  getHome = async (req, res, next) => {
    try {
      const products = await Product.find({
        isTrend: true,
        $or: [{ status: "Available" }, { status: "Reported" }],
      })
        .limit(6)
        .sort("timestamps: -1");
      res.render("home", {
        formatCurrency: formatCurrency,
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
