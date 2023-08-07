const siteRouter = require('./site.route');
const productRouter = require('./product.route');
const evaluateRouter = require('./evaluate.route');
const orderRouter = require('./order.route');

function route(app) {
  app.use('/', siteRouter);
  app.use('/product', productRouter);
  app.use('/order', orderRouter);
}

module.exports = route;
