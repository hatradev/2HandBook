const { render } = require('../utils/renderPage');
class SiteController {
  // [GET] /
  showHome = (req, res) => render(req, res, 'home');
  // showHome = (req, res) => res.render('home');
}

module.exports = new SiteController();
