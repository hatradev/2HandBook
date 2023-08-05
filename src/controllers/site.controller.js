const { render } = require('../utils/renderPage');
class SiteController {
  // [GET] /
  getHome = (req, res) => render(req, res, 'home');
}

module.exports = new SiteController();
