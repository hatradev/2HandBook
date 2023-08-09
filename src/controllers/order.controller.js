const hbs = require('express-handlebars');
const Order = require('../models/order.model');
const Account = require('../models/account.model');
const Product = require('../models/product.model');

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
      const accountId = aOrder._id

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

  getPayment = async (req, res, next) => {
    try {
      // const productId = req.params.id;
      const accBuyer = await Account.findOne({_id: req.user.id});
      const product = await Product.findOne({ _id: req.params._id })
      .populate('idAccount')

      res.locals.accBuyer = mongooseToObject(accBuyer);
      res.locals.product = mongooseToObject(product);

      // console.log(res.locals.product);
      res.render('payment');
      
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
    }
  };


  placeOrder = async (req, res, next) => {
    try {
      // const { idAccount, idProduct, status, message, quantity } = req.body; // Giả sử dữ liệu được gửi qua body
      // const idAccount = req.user.id;
      // const idProduct = req.params._id;
      // const message = req.body.message;
      // const quantity = 1;
      // console.log(idProduct)
  
      let newOrder = {
        idAccount: mongoose.Types.ObjectId(idProduct),
        detail: [
          {
            idProduct: mongoose.Types.ObjectId(idProduct),
            // quantity: 1,
            isEvaluated: false,
          },
        ],
        // status: "pending",
        // message,
      };
      // console.log(newOrder);
      res.json(newOrder)
  
      await newOrder.save();
      res.redirect(`/account/my-order-pending/${req.user.id}`);
      // res.status(201).json({ message: 'Đơn hàng đã được tạo thành công', order: savedOrder });
    } catch (err) {
      res.status(500).json({ error: 'Lỗi khi tạo đơn hàng a' });
    }
  };
  
}

module.exports = new orderController();
