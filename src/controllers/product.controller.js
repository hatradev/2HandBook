const Product = require('../models/product.model');
const multer = require('multer');
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
      // const storage = multer.diskStorage({
      //   destination: function (req, file, cb) {
      //     cb(null, 'uploads/');
      //   },

      //   // By default, multer removes file extensions so let's add them back
      //   filename: function (req, file, cb) {
      //     cb(
      //       null,
      //       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      //     );
      //   },
      // });
      console.log(req.body);
    } catch (err) {
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
      });
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
