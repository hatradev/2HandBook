const hbs = require('express-handlebars');
const Product = require('../models/product.model');
const sequelize = require('sequelize')
const Op = sequelize.Op

const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

var allProducts;

class productController {
  // [GET] product/all-product
  getAllProduct = async (req, res, next) => {
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

      res.locals.categories = categories
      res.locals.products = mutipleMongooseToObject(products)

      res.render('all-product')
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
    }
  }

  // [GET] product/all-product/category
  filterProduct = async (req, res, next) => {
    try {
      const type = req.query.category //? req.query.category : 0
      console.log(type)
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
      res.locals.categories = categories
      res.locals.products = mutipleMongooseToObject(products)

      res.render('all-product')
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 2' });
    }
  }

  // [GET] product/all-product/sort
  sortProduct = async (req, res, next) => {
    try {
      const type = req.query.sort
      const order = req.query.order
      console.log(type, order)
      const products = await Product.find({}).sort({ [type]: order });

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
      res.locals.categories = categories
      res.locals.products = mutipleMongooseToObject(products)

      res.render('all-product')
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 2' });
    }
  }

  // [GET] product/all-product/search
  searchProduct = async (req, res, next) => {
    try {
      const keyword = req.query.keyword || ''
      if (keyword.trim() != '') {
        const regex = new RegExp(keyword, 'i');
        const products = await Product.find({name: regex})

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

        res.locals.categories = categories
        res.locals.products = mutipleMongooseToObject(products)
        res.render('all-product')
      } else res.redirect('back');

    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 2' });
    }
  }
}

// Auxiliary

function removeParam(key, sourceURL) {
  var rtn = sourceURL.split("?")[0],
    param,
    params_arr = [],
    queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
}

function normalizeStr(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

module.exports = new productController();