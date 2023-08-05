const Product = require('../models/product.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class productController {
  // [GET] product/dashboard
  getDashboard = async (req, res, next) => {
    try {
      const products = await Product.find();
      res.render('dashboard', {
        showHeader: true,
        showFooter: true,
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] product/manage
  getManage = async (req, res, next) => {
    try {
      const products = await Product.find();
      res.render('manage-product', {
        showHeader: true,
        showFooter: true,
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] product/edit/
  getEditForCreate = async (req, res) => {
    res.render('edit-product', {
      showHeader: true,
      showFooter: true,
      helpers: {
        isCategory(c1, c2) {
          return c1 == 'Document';
        },
      },
    });
  };

  // [POST] product/edit
  createNewProduct = async (req, res) => {};

  // [GET] product/edit/:id
  getEditForUpdate = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.render('edit-product', {
        showHeader: true,
        showFooter: true,
        product: mongooseToObject(product),
        helpers: {
          isCategory(c1, c2) {
            return c1 == c2;
          },
        },
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new productController();
