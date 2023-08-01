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

module.exports = app;
