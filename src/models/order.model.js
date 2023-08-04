const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  idAccount: {
    type: String,
    required: true
  },
  detail: {
    idProduct: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    isEvaluated: {
      type: Boolean,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['cancelled', 'pending', 'successful'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String
  }
});

module.exports = mongoose.model('Order', orderSchema);
