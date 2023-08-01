const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    required: [true, 'A tour must have a price'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: 'Book',
  },
  image: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  views: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  isTrend: {
    type: Number,
    default: 0,
  },
  keyword: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('product', productSchema);
