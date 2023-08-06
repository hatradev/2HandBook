const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

// router.get('/dashboard', productController.getDashboard);
// router.get('/manage', productController.getManage);
router.get('/all-product', productController.getAllProduct);
router.post('/all-product/sort', productController.sortProduct);
// router.get('/edit', productController.getEditForCreate);
// router.post('/edit/save', productController.createNewProduct);
// router.get('/edit/:id', productController.getEditForUpdate);

module.exports = router;
