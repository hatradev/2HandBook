const express = require('express');
const handlebars = require('express-handlebars');
const bookRouter = require('../routes/book.route');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
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
app.use(express.json());
app.use('/2handbook/books', bookRouter);

// Template engines
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Trieu test
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
  res.render('my_order_inConfirmation', { showHeader: true, showFooter: true });
});

app.get('/myordercanceled', (req, res) => {
  res.render('my_order_canceled', { showHeader: true, showFooter: true });
});

app.get('/myorder', (req, res) => {
  res.render('my_order', { showHeader: true, showFooter: true });
});

app.get('/test', (req, res) => {
  res.render('test', { showHeader: true, showFooter: true });
});

app.get('/', (req, res) => {
  res.render('home', { showHeader: true, showFooter: true });
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

app.get('/all-product', (req, res) => {
  res.render('all-product', { showHeader: true, showFooter: true });
});
app.get('/specific-product', (req, res) => {
  res.render('specific-product', {
    showHeader: true,
    showFooter: true,
  });
});
app.get('/manage-order', (req, res) => {
  res.render('manage-order', { showHeader: true, showFooter: true });
});
app.get('/shop-info', (req, res) => {
  res.render('shop-info', { showHeader: true, showFooter: true });
});

module.exports = app;
