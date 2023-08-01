const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/dashboard', productController.getDashboard);
router.get('/manage', productController.getManage);
router.get('/edit', productController.getEdit);
router.get('/', productController.getAllProducts);

module.exports = router;
