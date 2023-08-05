const createError = require('http-errors');
const siteRouter = require('./site.route');
const productRouter = require('./product.route');
const accountRouter = require('./account.route');
const announceRouter = require('./announcement.route');

function route(app) {
  app.use('/', siteRouter);
  app.use('/product', productRouter);
  app.use('/account', accountRouter);
  app.use('/announcement', announceRouter);

  app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
  });
  app.use((err, req, res, next) => {
    res.json({
      status: err.status || 500,
      message: err.message,
    });
  });
}

module.exports = route;
