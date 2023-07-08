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
  res.render('profile_updating');
});

app.get('/becomeseller', (req, res) => {
  res.render('become_seller');
});

app.get('/myorderdelivery', (req, res) => {
  res.render('my_order_inDelivery');
});

app.get('/myorderconfirmation', (req, res) => {
  res.render('my_order_inConfirmation');
});

app.get('/myordercanceled', (req, res) => {
  res.render('my_order_canceled');
});

app.get('/myorder', (req, res) => {
  res.render('my_order');
});


app.get('/test', (req, res) => {
  res.render('test');
});

app.get('/', (req, res) => {
  res.render('home');
});



module.exports = app;
