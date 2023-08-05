const { render } = require('../utils/renderPage');
class SiteController {
  // [GET] /
  showHome = (req, res) => render(req, res, 'home');
}

module.exports = new SiteController();
