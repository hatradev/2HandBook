const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const bodyParser = require('body-parser');
const route = require('../routes/index.route');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('../middleware/passport');
const redisStore = require('connect-redis').default;
const { createClient } = require('redis');
const redisClient = createClient({
  url: 'redis://127.0.0.1:6379',
});

redisClient.connect().catch(console.error);

const liveReloadServer = livereload.createServer();
const app = express();
// Livereload for automatically refresh browser
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(connectLiveReload());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engines handlebars
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Cau hinh su dung sesssion
app.use(
  session({
    secret: 'S3cret',
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1 * 60 * 1000, // 1phut
    },
  })
);

// Cau hinh su dung passport
app.use(passport.initialize());
app.use(passport.session());

// Cau hinh su dung connect-flash
app.use(flash());

// Middleware khoi tao
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated(); // Check nguoi dung dang nhap hay chua
  next();
});

// ROUTES INIT
route(app);

module.exports = app;
