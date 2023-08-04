const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const bodyParser = require('body-parser');
const route = require('../routes/index.route');

const liveReloadServer = livereload.createServer();
const app = express();
// Livereload for automatically refresh browser
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(connectLiveReload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api/books', bookRouter);

// Template engines handlebars
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// ROUTES INIT
route(app);

app.get('/profile', (req, res) => {
  res.render('profile_updating', { showHeader: true, showFooter: true });
});

app.get('/becomeseller', (req, res) => {
  res.render('become_seller', { showHeader: true, showFooter: true });
});

app.get('/myorderdelivery', (req, res) => {
  res.render('my_order_inDelivery', { showHeader: true, showFooter: true });
});

app.get('/myorderconfirmation', (req, res) => {
  res.render('my_order_inConfirmation', {
    showHeader: true,
    showFooter: true,
  });
});

app.get('/myordercancelled', (req, res) => {
  res.render('my_order_canceled', { showHeader: true, showFooter: true });
});

app.get('/myorder', (req, res) => {
  res.render('my_order', { showHeader: true, showFooter: true });
});

app.get('/test', (req, res) => {
  res.render('test', { showHeader: true, showFooter: true });
});

app.get('/all-product', (req, res) => {
  res.render('all-product', {
    showHeader: true,
    showFooter: true,
  });
});

app.get('/specific-product', (req, res) => {
  res.render('specific-product', {
    showHeader: true,
    showFooter: true,
  });
});

app.get('/manage-order', (req, res) => {
  res.render('manage-order', {
    showHeader: true,
    showFooter: true,
  });
});

app.get('/shop-info', (req, res) => {
  res.render('shop-info', { showHeader: true, showFooter: true });
});

app.get('/manage-product', (req, res) => {
  res.render('manage-product', { showHeader: true, showFooter: true });
});

app.get('/edit-product', (req, res) => {
  res.render('edit-product', { showHeader: true, showFooter: true });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { showHeader: true, showFooter: true });
});

app.get('/payment', (req, res) => {
  res.render('payment', { showHeader: true, showFooter: true });
});

app.get('/admin_announcement', (req, res) => {
  res.render('admin_announcement', { showHeader: true, showFooter: true });
});

app.get('/admin_all_announcement', (req, res) => {
  res.render('admin_all_announcement', { showHeader: true, showFooter: true });
});

app.get('/admin_account_all', (req, res) => {
  res.render('admin_account_all', { showHeader: true, showFooter: true });
});

app.get('/admin_account_pending', (req, res) => {
  res.render('admin_account_pending', { showHeader: true, showFooter: true });
});

app.get('/admin_account_reported', (req, res) => {
  res.render('admin_account_reported', { showHeader: true, showFooter: true });
});

app.get('/admin_account_banned', (req, res) => {
  res.render('admin_account_banned', { showHeader: true, showFooter: true });
});

app.get('/admin_product_all', (req, res) => {
  res.render('admin_product_all', { showHeader: true, showFooter: true });
});

app.get('/admin_product_pending', (req, res) => {
  res.render('admin_product_pending', { showHeader: true, showFooter: true });
});

app.get('/admin_product_reported', (req, res) => {
  res.render('admin_product_reported', { showHeader: true, showFooter: true });
});

app.get('/admin_product_banned', (req, res) => {
  res.render('admin_product_banned', { showHeader: true, showFooter: true });
});

app.get('/admin_product_trending', (req, res) => {
  res.render('admin_product_trending', { showHeader: true, showFooter: true });
});

app.get('/admin_comment_all', (req, res) => {
  res.render('admin_comment_all', { showHeader: true, showFooter: true });
});

app.get('/admin_comment_reported', (req, res) => {
  res.render('admin_comment_reported', { showHeader: true, showFooter: true });
});
app.get('/sign-up', (req, res) => {
  res.render('sign-up', { showHeader: true, showFooter: true });
});
app.get('/sign-in', (req, res) => {
  res.render('sign-in', { showHeader: true, showFooter: true });
});

module.exports = app;
