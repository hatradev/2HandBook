const Product = require('../models/product.model');
const fs = require('fs');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');
class productController {
  // ###################### SELLER #############################
  // [GET] product/dashboard
  getDashboard = async (req, res, next) => {
    try {
      const products = await Product.find();
      res.render('dashboard', {
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
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] product/edit/
  getEditForCreate = async (req, res) => {
    res.render('edit-product', {
      helpers: {
        isCategory(c1, c2) {
          return c1 == 'Document';
        },
      },
    });
  };

  // [POST] product/edit/save
  createNewProduct = async (req, res, next) => {
    try {
      // Lưu thông tin sản phẩm vào trong database
      const formData = req.body;
      formData.price = Number(formData.price);
      formData.stock = Number(formData.stock);
      formData.isTrend = Number(formData.isTrend);
      formData.keyword = formData.keyword.split(',');
      formData.keyword = formData.keyword.map((str) => str.trim());
      if (req.file && !req.fileValidationError) {
        formData.image = req.file.path.replace('source/public', '');
      } else {
        formData.image = '/img/products/default.png';
      }
      const newProduct = await Product(formData);
      newProduct.save();
      res.render('message/processing-request');
    } catch (err) {
      res.send(err);
      next(err);
    }
  };

  // [GET] product/edit/:id
  getEditForUpdate = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.render('edit-product', {
        product: mongooseToObject(product),
        helpers: {
          isCategory(c1, c2) {
            return c1 == c2;
          },
        },
        getEditForUpdate: true,
      });
    } catch (err) {
      next(err);
    }
  };

  // [POST] product/edit/save/:id
  updateProduct = async (req, res, next) => {
    try {
      const formData = req.body;
      const product = await Product.findById(req.params.id);
      if (req.file) {
        if (product.image != '/img/products/default.png') {
          fs.unlinkSync(`./source/public${product.image}`);
        }
        formData.image = req.file.path.replace('source/public', '');
      } else if (product.image == '/img/products/default.png') {
        formData.image = '/img/products/default.png';
      }
      await Product.updateOne({ _id: req.params.id }, formData);
      res.redirect('/product/manage');
    } catch (err) {
      next(err);
    }
  };
  // ###########################################################
  // ###################### BUYER #############################
  getAllProduct = async (req, res, next) => {
    res.render('all-product');
  };
  getAProduct = async (req, res, next) => {
    res.render('specific-product');
  };
  getCart = {};
  add2Cart = async (req, res, next) => {
    // Lấy id và quantity sản phẩm gửi từ client
    let id = req.body.id ? req.body.id : '';
    let quantity = req.body.quantity;
  };
  // ###########################################################
}

module.exports = new productController();
