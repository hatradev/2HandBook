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
  // res.render('home');
  // res.render('product/all-product');
  res.render('product/specific-product');
});

module.exports = app;
