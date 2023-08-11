const Product = require('../models/product.model');
const fs = require('fs');
const Evaluate = require('../models/evaluate.model');
const Account = require('../models/account.model');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

var allProducts;

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
      let options = { idAccount: req.user.id };
      // Tìm kiếm
      let keyword = req.query.keyword || '';
      // Lọc theo loại
      let category = req.query.category || '';
      // Sắp xếp
      let sortBy = req.query.sortBy || '';
      keyword = keyword.trim();
      let originalUrl = req.originalUrl;
      if (keyword != '') {
        const regex = new RegExp(keyword, 'i');
        options.name = regex;
      }
      if (category != '') {
        options.category = category;
      }
      // Phân trang
      let page = isNaN(req.query.page)
        ? 1
        : Math.max(1, parseInt(req.query.page));
      const limit = 10;
      // Thực hiện truy vấn
      let products = await Product.find(options)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortBy);
      res.locals._keyword = keyword;
      res.locals._category = category;
      res.locals._sortBy = sortBy;
      res.locals._numberOfItems = await Product.find(options).countDocuments();
      res.locals._limit = limit;
      res.locals._currentPage = page;
      res.locals._originalUrl = req.url;
      res.render('manage-product', {
        products: mutipleMongooseToObject(products),
        helpers: {
          isEqual(c1, c2) {
            return c1 == c2;
          },
        },
      });
    } catch (err) {
      next(err);
    }
  };

  // [GET] product/edit/
  getEditForCreate = (req, res) => {
    console.log(req.query);
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
      formData.idAccount = req.user.id;
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
      console.log(req.query);
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
          // fs.unlinkSync(`./source/public${product.image}`);
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

  // [POST] product/delete/:id
  deleteProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product.image != '/img/products/default.png') {
        fs.unlinkSync(`./source/public${product.image}`);
      }
      await Product.deleteOne({ _id: req.params.id });
      res.redirect(
        `/product/manage?page=${req.query.page ? req.query.page : ''}`
      );
    } catch (err) {
      next(err);
    }
  };
  // ###########################################################
  // ###################### BUYER #############################
  // getCart = {};
  add2Cart = async (req, res, next) => {
    // Lấy id và quantity sản phẩm gửi từ client
    let id = req.body.id ? req.body.id : '';
    let quantity = req.body.quantity;
  };
  // ###########################################################
  // [GET] product/all-product
  showAllProduct = async (req, res, next) => {
    try {
      const products = await Product.find({});
      const categories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
      res.locals.categories = categories;
      res.locals.products = mutipleMongooseToObject(products);
      res.render('all-product');
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
    }
  };

  // [GET] product/all-product/category
  filterProduct = async (req, res, next) => {
    try {
      const type = req.query.category; //? req.query.category : 0
      // console.log(type);
      const products = await Product.find({ category: type });
      const categories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 }, // Sắp xếp giảm dần dựa trên trường 'count'
        },
      ]);
      res.locals.categories = categories;
      res.locals.products = mutipleMongooseToObject(products);

      res.render('all-product');
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 2' });
    }
  };

  // [GET] product/all-product/sort
  sortProduct = async (req, res, next) => {
    try {
      const type = req.query.sort;
      const order = req.query.order;
      let options = {}
      if (req.query.category){
        options.category = req.query.category
      }
      const keyword = req.query.keyword || '';
      if (keyword.trim() != '') {
        const regex = new RegExp(keyword, 'i');
        options.name = regex
        console.log(options)
      }
      
      // const type_category = req.query.category ? req.query.category : 0
      // console.log(type, order);
      const products = await Product.find(options).sort({ [type]: order });
      // if(type_category){
      //   products = await Product.find({}).sort({ [type]: order });
      // }

      // if (type_category){
      //   products.find({ category: type_category });
      // }
      // console.log(type);

      const categories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
      res.locals.categories = categories;
      res.locals.products = mutipleMongooseToObject(products);

      res.render('all-product');
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 2' });
    }
  };

  // [GET] product/all-product/search
  searchProduct = async (req, res, next) => {
    try {
      const keyword = req.query.keyword || '';
      if (keyword.trim() != '') {
        const regex = new RegExp(keyword, 'i');
        const products = await Product.find({ name: regex });

        const categories = await Product.aggregate([
          {
            $group: {
              _id: '$category',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ]);

        res.locals.categories = categories;
        res.locals.products = mutipleMongooseToObject(products);
        res.render('all-product');
      } else res.redirect('back');
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 2' });
    }
  };

  // [GET] product/specific-product
  showSpecificProduct = async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await Product.findOne({ _id: productId });
      const details = product.description.split('\n');
      const evaluates = await Evaluate.find({ idProduct: productId })
        .populate({
          path: 'idAccount',
          select: 'firstName lastName avatar',
        })
        .sort({ date: -1 });

      const stars = await Evaluate.aggregate([
        {
          $match: {
            idProduct: productId,
          },
        },
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$rating' },
          },
        },
      ]);
      const related = await Product.aggregate([
        {
          $match: {
            keyword: product.keyword,
          },
        },
        { $limit: 6 },
      ]);

      res.locals.details = details;
      res.locals.product = mongooseToObject(product);
      res.locals.stars = stars[0];
      res.locals.related = related;
      res.locals.evaluates = mutipleMongooseToObject(evaluates);

      res.render('specific-product');
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 3' });
    }
  };

  // [PUT] product/specific-product/:id/report
  reportProduct = async (req, res, next) => {
    try {
      const productId = req.params.id;
      await Product.updateOne(
        { _id: productId },
        { $set: { status: 'Reported' } }
      );
      res.redirect('back');
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 3' });
    }
  };
}

// ***************************** Helper function *******************************
function removeParam(key, sourceURL) {
  var rtn = sourceURL.split('?')[0],
    param,
    params_arr = [],
    queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
  if (queryString !== '') {
    params_arr = queryString.split('&');
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split('=')[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    if (params_arr.length) rtn = rtn + '?' + params_arr.join('&');
  }
  return rtn;
}

function normalizeStr(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

module.exports = new productController();
