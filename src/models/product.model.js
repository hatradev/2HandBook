const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: 40,
      minlength: 10,
    },
    price: {
      type: Number,
      required: [true, 'A price must have a price'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A product must have a description'],
    },
    stock: {
      type: Number,
      required: [true, 'A product mus have a stock'],
    },
    category: {
      type: String,
      default: 'Document',
    },
    image: {
      type: String,
      required: [true, 'A product must have a cover image'],
    },
    status: {
      type: String,
      default: 'Pending',
    },
    isTrend: {
      type: Boolean,
      default: false,
    },
    keyword: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('product', productSchema);
