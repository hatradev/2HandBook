const mongoose = require('mongoose');

const evaluateSchema = new mongoose.Schema(
  {
    idAccount: {
        type: String,
    },
    idProduct: {
        type: String,
    },
    content: {
        type: String,
    },
    reply: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    status: {
        type: String,
        enum: ['reported','none'],
        default: 'none',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('evaluate', evaluateSchema);
