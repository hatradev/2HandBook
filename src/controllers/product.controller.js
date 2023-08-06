const hbs = require('express-handlebars');
const Product = require('../models/product.model');
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require('../utils/mongoose');

var allProducts;

class productController {
  // [GET] product/all-product
  getAllProduct(req, res, next) {
    Product.find({})
      .then((products) => {
        allProducts = mutipleMongooseToObject(products)
        res.render('all-product', {
          products: mutipleMongooseToObject(products),
          // showHeader: true,
          // showFooter: true,
        });
      })
      .catch(next);
  }
  // [GET] product/all-product/sort
  // sortProduct(req, res, next) {
  //   // const selectedItems = allProducts.filter(item => {
  //   //   // console.log(item._id.toString())
  //   //   return req.body.productsId.includes(item._id.toString())
  //   // })

  //   // selectedItems.sort((a,b) => a.price - b.price)
  //   // res.render('all-product', {
  //   //   selectedItems: mutipleMongooseToObject(selectedItems),
  //   // });
  //   // res.render('all-product', selectedItems);
  //   // res.json(req.body)
  //   var order = req.body.type[1] == 'asc' ? 1 : -1

  //   Product.find({ _id: { $in: req.body.productsId } })
  //     .sort({[req.body.type[0]]: order})
  //     .then((products) => {
  //       res.render('all-product', {
  //         products: mutipleMongooseToObject(products),
  //       });
  //     })
  //     .catch(next);

  //   // console.log(allProducts)
  //   // console.log(req.body.productsId)


  //   // res.json(filter)
  // }

  sortProduct = async (req, res, next) => {
    try {
      var order = req.body.type[1] == 'asc' ? 1 : -1;

      const products = await Product.find({ _id: { $in: req.body.productsId } })
        .sort({ [req.body.type[0]]: order });
      console.log(req.body.type[0], order, { [req.body.type[0]]: order })
      products.forEach(it => console.log(it.price))

      res.render('all-product', {
        products: mutipleMongooseToObject(products),
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new productController();

// sortProduct(req, res, next) {
//   const filter = allProducts.filter(item => {
//     return req.body.productsId.includes(item._id.toString())
//   })

// }

// sortProduct(req, res, next) {
//   var order = req.body.type[1] == 'asc' ? 1 : -1

//   Product.find({ _id: { $in: req.body.productsId } })
//     .sort({[req.body.type[0]]: order})
//     .then((products) => {
//       res.render('all-product', {
//         products: mutipleMongooseToObject(products),
//       });
//     })
//     .catch(next);
// }