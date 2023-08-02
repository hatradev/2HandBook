const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/dashboard', productController.getDashboard);
router.get('/manage', productController.getManage);
router.get('/edit', productController.getEditForCreate);
router.post('/edit/save', productController.createNewProduct);
router.get('/edit/:id', productController.getEditForUpdate);

module.exports = router;
