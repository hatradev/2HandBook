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

app.get('/product/all-product', (req, res) => {
  res.render('product/all-product', { showHeader: true, showFooter: true });
});
app.get('/product/specific-product', (req, res) => {
  res.render('product/specific-product', {
    showHeader: true,
    showFooter: true,
  });
});
app.get('/order/manage-order', (req, res) => {
  res.render('order/manage-order', { showHeader: true, showFooter: true });
});

module.exports = app;
