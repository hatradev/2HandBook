const siteRouter = require('./site.route');
const productRouter = require('./product.route');

function route(app) {
  app.use('/', siteRouter);
  app.use('/product', productRouter);
  // app.get('/profile', (req, res) => {
  //   res.render('profile_updating', { showHeader: true, showFooter: true });
  // });

  // app.get('/becomeseller', (req, res) => {
  //   res.render('become_seller', { showHeader: true, showFooter: true });
  // });

  // app.get('/myorderdelivery', (req, res) => {
  //   res.render('my_order_inDelivery', { showHeader: true, showFooter: true });
  // });

  // app.get('/myorderconfirmation', (req, res) => {
  //   res.render('my_order_inConfirmation', {
  //     showHeader: true,
  //     showFooter: true,
  //   });
  // });

  // app.get('/myordercanceled', (req, res) => {
  //   res.render('my_order_canceled', { showHeader: true, showFooter: true });
  // });

  // app.get('/myorder', (req, res) => {
  //   res.render('my_order', { showHeader: true, showFooter: true });
  // });

  // app.get('/test', (req, res) => {
  //   res.render('test', { showHeader: true, showFooter: true });
  // });

  // app.get('/all-product', (req, res) => {
  //   res.render('all-product', { showHeader: true, showFooter: true });
  // });

  // app.get('/specific-product', (req, res) => {
  //   res.render('specific-product', {
  //     showHeader: true,
  //     showFooter: true,
  //   });
  // });

  // app.get('/manage-order', (req, res) => {
  //   res.render('manage-order', { showHeader: true, showFooter: true });
  // });

  // app.get('/shop-info', (req, res) => {
  //   res.render('shop-info', { showHeader: true, showFooter: true });
  // });

  // app.get('/manage-product', (req, res) => {
  //   res.render('manage-product', { showHeader: true, showFooter: true });
  // });

  // app.get('/edit-product', (req, res) => {
  //   res.render('edit-product', { showHeader: true, showFooter: true });
  // });

  // app.get('/dashboard', (req, res) => {
  //   res.render('dashboard', { showHeader: true, showFooter: true });
  // });
}

module.exports = route;
