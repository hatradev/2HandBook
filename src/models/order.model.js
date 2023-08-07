const mongoose = require('mongoose');
const productSchema = require('./product.model');
const accountSchema = require('./account.model');

const orderSchema = new mongoose.Schema({
  idAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accountSchema',
    required: true,
  },
  detail: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productSchema',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      isEvaluated: {
        type: Boolean,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['cancelled', 'pending', 'successful'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model('Order', orderSchema);
