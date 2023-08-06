const siteRouter = require('./site.route');
const productRouter = require('./product.route');

function route(app) {
  app.use('/', siteRouter);
  app.use('/product', productRouter);
}

module.exports = route;
