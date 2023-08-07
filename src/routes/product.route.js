const express = require('express');
const { upload } = require('../utils/upload-file');
const productController = require('../controllers/product.controller');
const acccountController = require('../controllers/account.controller');

const router = express.Router();
// ######################## BUYER #########################
router.get('/all-product', productController.getAllProduct);
router.get('/all-product/:id', productController.getAProduct);
router.post('/cart', productController.add2Cart);
// #########################################################
// router.use(acccountController.isLoggedIn);
// ######################## SELLER #########################
router.get('/dashboard', productController.getDashboard);
router.get('/manage', productController.getManage);
router.get('/edit', productController.getEditForCreate);
router.get('/edit/:id', productController.getEditForUpdate);
router.post('/edit/save', upload, productController.createNewProduct);
router.post('/edit/save/:id', upload, productController.updateProduct);
// #########################################################
module.exports = router;
