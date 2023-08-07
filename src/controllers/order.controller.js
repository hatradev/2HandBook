const hbs = require('express-handlebars');
const Order = require('../models/order.model');

const sequelize = require('sequelize')
const Op = sequelize.Op

const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

var allProducts;

class productController {
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

      res.locals.categories = categories
      res.locals.products = mutipleMongooseToObject(products)

      res.render('all-product')
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
    }
  }
}

module.exports = new productController();