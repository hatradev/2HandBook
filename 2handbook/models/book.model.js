const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A book must have a name'],
    unique: true,
    trim: true,
  },
  description: [String],
  price: {
    type: Number,
    required: [true, 'A book must have a description'],
  },
  stock: {
    type: Number,
    required: [true, 'A book must have a stock'],
  },
  falcuty: String,
  category: {
    type: String,
    required: [true, 'A book must have a category'],
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
