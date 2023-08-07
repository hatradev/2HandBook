const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

router.get('/all-product', productController.showAllProduct);
router.get('/all-product/category', productController.filterProduct);
router.get('/all-product/sort', productController.sortProduct);
router.get('/all-product/search', productController.searchProduct);


// router.put('/specific-product/:id/report', productController.reportProduct);
router.get('/specific-product/:id', productController.showSpecificProduct);

module.exports = router;
