// const createError = require('http-errors');
const siteRouter = require('./site.route');
const productRouter = require('./product.route');
const accountRouter = require('./account.route');
const announceRouter = require('./announcement.route');
const evaluateRouter = require('./evaluate.route');
const orderRouter = require('./order.route');

function route(app) {
  console.log('route app');
  app.get('/upload', (req, res) => {
    res.render('upload-file');
  });
  // Định nghĩa các route theo tài nguyên
  app.use('/', siteRouter);
  app.use('/account', accountRouter);
  app.use('/announcement', announceRouter);
  app.use('/product', productRouter);
  app.use('/order', orderRouter);
  app.use('/evaluate', evaluateRouter);

  // Hai middlewares này phải để cuối để check lỗi
  // app.use((req, res, next) => {
  //   res.status(404).render('error', {
  //     message: 'File not Found',
  //     lastName: req.user ? req.user.lastName : '',
  //   });
  // });
  // app.use((error, req, res, next) => {
  //   console.error(error);
  //   res.status(500).render('error', {
  //     message: 'Internal Server Error!',
  //     lastName: req.user ? req.user.lastName : '',
  //   });
  // });
}

module.exports = route;
