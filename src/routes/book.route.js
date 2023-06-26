const express = require('express');
const bookController = require('../controllers/book.controller');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getOneBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
