const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const bodyParser = require("body-parser");
const route = require("../routes/index.route");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("../middleware/passport");
const redisStore = require("connect-redis").default;
const { createClient } = require("redis");
const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.connect().catch(console.error);

const liveReloadServer = livereload.createServer();
const app = express();
// Livereload for automatically refresh browser
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(connectLiveReload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// Template engines handlebars
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: require("../helpers/handlebars"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Cấu hình sử dụng express session
app.use(
  session({
    secret: "S3cret",
    store: new redisStore({
      client: redisClient,
      ttl: 60 * 60 * 6, // Redis sẽ tự dedete session sau 6 tiếng
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 20 * 60 * 1000, // Cookie của người dùng sẽ tự expire sau 20 phút
    },
  })
);

// Cấu hình sử dụng passport cho việc authentication
app.use(passport.initialize());
app.use(passport.session());

// Cấu hình sử dụng flash cho các thông báo đến người dùng
app.use(flash());

// Middleware khởi tạo các thông tin cần thiết cho người dùng như trạng thái đăng nhập, giỏ hàng, ...
app.use((req, res, next) => {
  // Check coi người dùng đăng nhập hay chưa, lưu trạng thái vào isLoggedIn
  res.locals.isLoggedIn = req.isAuthenticated();
  // Khởi tạo giỏ hàng
  if (!req.session.cart) {
    req.session.cart = [];
    res.locals._cartNumber = 0;
  }
  if (!res.locals._cartNumber) {
    res.locals._cartNumber = req.session.cart.reduce(
      (accum, product) => accum + product.quantity,
      0
    );
  }
  if (res.locals.isLoggedIn) {
    res.locals._id = req.user._id;
    res.locals._firstName = req.user.firstName;
    require("../middleware/cartInit")(req, res, next);
    res.locals._cartNumber = req.user.cart.reduce(
      (accum, product) => accum + product.quantity,
      0
    );
    if (!req.session.readAnnounce) {
      req.session.readAnnounce = req.user.readAnnounce;
    }
  }
  next();
});

// ROUTES INIT
route(app);

module.exports = app;
