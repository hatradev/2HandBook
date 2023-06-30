const Book = require('../models/book.model');
// const fs = require('fs');

// const books = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8')
// );

exports.getAllBooks = async function (req, res) {
  const books = await Book.find();
  try {
    res.status(200).json({
      status: 'success',
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createBook = async function (req, res) {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOneBook = async function (req, res) {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { book },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        updatedBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
