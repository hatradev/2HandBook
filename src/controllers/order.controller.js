const hbs = require('express-handlebars');
const Order = require('../models/order.model');
const Account = require('../models/account.model');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

var allProducts;

class orderController {
  // [GET] order/manage-order
  showAllOrder = async (req, res, next) => {
    try {
      const aOrder = await Account.findOne();
      // const accountId = aOrder._id
      const accountId = req.user._id

      const orders = await Order.find({idSeller: accountId})
      .populate('idAccount')
      .populate('detail.idProduct')
      const orderObject = mutipleMongooseToObject(orders)
      
      var products = []
      var messages = []
      for (var i of orderObject){
        messages.push({'idOrder': i._id, 'message': i.message})
        for (var j of i.detail){
          Object.assign(j,{'idOrder': i._id})
          var temp = []
          temp.push(j)
          products.push(j)
        }
      }
      res.locals.orders = orderObject;
      res.locals.products = products;
      res.locals.messages = messages;

      res.render('manage-order');
      
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
    }
  };

  // [PUT] order/manage-order/:id/reject
  rejectOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      await Order.updateOne({ _id: orderId }, { $set: { status: 'cancelled' } });
      res.redirect('back');
      
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
    }
  };

  acceptOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      await Order.updateOne({ _id: orderId }, { $set: { status: 'successful' } });
      res.redirect('back');
      
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
    }
  };
  
}

module.exports = new orderController();
