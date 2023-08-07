const { render } = require('../utils/renderPage');
const Product = require('../models/product.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class SiteController {
  // [GET] /
  getHome = async (req, res, next) => {
    try {
      const products = await Product.find({ isTrend: true });
      res.render('home', {
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  };
  getAboutUs = (req, res) => render(req, res, 'about-us');
}

module.exports = new SiteController();
