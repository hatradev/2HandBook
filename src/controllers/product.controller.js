const Product = require('../models/product.model');
const { mutipleMongooseToObject } = require('../utils/mongoose');
class productController {
  // [GET] product/dashboard
  getDashboard = async (req, res) => {
    const products = await Product.find();
    res.render('dashboard', {
      showHeader: true,
      showFooter: true,
      products: mutipleMongooseToObject(products),
    });
  };

  // [GET] product/manage
  getManage = async (req, res) => {
    const products = await Product.find();
    res.render('manage-product', {
      showHeader: true,
      showFooter: true,
      products: mutipleMongooseToObject(products),
    });
  };

  // [GET] product/edit
  getEdit = (req, res) => {
    res.render('edit-product', { showHeader: true, showFooter: true });
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        status: 'success',
        data: {
          products,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  };
}

module.exports = new productController();
