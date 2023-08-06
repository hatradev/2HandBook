const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

router.get('/all-product', productController.getAllProduct);
router.get('/all-product/category', productController.filterProduct);
router.get('/all-product/sort', productController.sortProduct);
router.get('/all-product/search', productController.searchProduct);

module.exports = router;
