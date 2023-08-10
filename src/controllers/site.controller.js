const Product = require('../models/product.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class siteController {
  // [GET] /
  getHome = async (req, res, next) => {
    console.log('OK');
    try {
      const products = await Product.find({ isTrend: true });
      res.render('home', {
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  };

  getAboutUs = (req, res, next) => {
    try {
      res.render('about-us');
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new siteController();
