const express = require('express');
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
router.post('/edit/save', productController.createNewProduct);
router.get('/edit/:id', productController.getEditForUpdate);
// #########################################################
module.exports = router;
