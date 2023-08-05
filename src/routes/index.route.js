const createError = require('http-errors');
const siteRouter = require('./site.route');
const productRouter = require('./product.route');
const accountRouter = require('./account.route');

function route(app) {
  app.use('/', siteRouter);
  app.use('/account', accountRouter);
  app.use('/product', productRouter);
  app.use((req, res, next) => {
    res.status(404).render('error', {
      message: 'File not Found',
      lastName: req.user ? req.user.lastName : '',
    });
  });
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).render('error', {
      message: 'Internal Server Error!',
      lastName: req.user ? req.user.lastName : '',
    });
  });
  // ======================
  app.get('/all-product', (req, res) => {
    res.render('all-product');
  });

  app.get('/specific-product', (req, res) => {
    res.render('specific-product');
  });

  app.get('/manage-order', (req, res) => {
    res.render('manage-order');
  });

  app.get('/shop-info', (req, res) => {
    res.render('shop-info');
  });

  app.get('/payment', (req, res) => {
    res.render('payment');
  });

  app.get('/admin_announcement', (req, res) => {
    res.render('admin_announcement');
  });

  app.get('/admin_all_announcement', (req, res) => {
    res.render('admin_all_announcement');
  });

  app.get('/admin_account_all', (req, res) => {
    res.render('admin_account_all');
  });

  app.get('/admin_account_pending', (req, res) => {
    res.render('admin_account_pending');
  });

  app.get('/admin_account_reported', (req, res) => {
    res.render('admin_account_reported');
  });

  app.get('/admin_account_banned', (req, res) => {
    res.render('admin_account_banned');
  });

  app.get('/admin_product_all', (req, res) => {
    res.render('admin_product_all');
  });

  app.get('/admin_product_pending', (req, res) => {
    res.render('admin_product_pending');
  });

  app.get('/admin_product_reported', (req, res) => {
    res.render('admin_product_reported');
  });

  app.get('/admin_product_banned', (req, res) => {
    res.render('admin_product_banned');
  });

  app.get('/admin_product_trending', (req, res) => {
    res.render('admin_product_trending');
  });

  app.get('/admin_comment_all', (req, res) => {
    res.render('admin_comment_all');
  });

  app.get('/admin_comment_reported', (req, res) => {
    res.render('admin_comment_reported');
  });

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
