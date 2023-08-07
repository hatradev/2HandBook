const mongoose = require('mongoose');
const product = require('./product.model');
const account = require('./account.model');

const evaluateSchema = new mongoose.Schema(
  {
    idAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
    content: {
      type: String,
    },
    reply: {
      type: String, // content mà shop reply không phải tham chiếu tới evaluate_id
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    status: {
      type: String,
      enum: ['reported', 'none'],
      default: 'none',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('evaluate', evaluateSchema);
