const express = require("express");
const { upload } = require("../utils/upload-file");
const productController = require("../controllers/product.controller");
const acccountController = require("../controllers/account.controller");

const router = express.Router();

// ######################## GUEST #########################
router.get("/all-product", productController.showAllProduct);
router.get("/all-product/category", productController.filterProduct);
router.get("/all-product/sort", productController.sortProduct);
router.get("/all-product/search", productController.searchProduct);
router.get("/specific-product/:id", productController.showSpecificProduct);
router.put("/specific-product/:id/report", productController.reportProduct);
router.get("/cart", productController.getCart);
router.post("/cart", productController.add2Cart);
router.delete("/cart/:id", productController.deleteFromCart);
// #########################################################
router.use(acccountController.isLoggedIn);
// ######################## SELLER #########################
router.get("/dashboard", productController.getDashboard);
router.get("/manage", productController.getManage);
router.get("/edit", productController.getEditForCreate);
router.get("/edit/:id", productController.getEditForUpdate);
router.post("/edit/save", upload, productController.createNewProduct);
router.post("/edit/save/:id", upload, productController.updateProduct);
router.post("/delete/:id", productController.deleteProduct);
// #########################################################
router.use(acccountController.isAdmin);
// ######################## ADMIN #########################
router.get("/full", productController.getFullProduct);
router.get("/banned", productController.getBannedProduct);
router.get("/pending", productController.getPendingProduct);
router.get("/reported", productController.getReportedProduct);
router.get("/trending", productController.getTrendProduct);
router.post("/exec-product", productController.executeProduct);
// #########################################################

module.exports = router;
