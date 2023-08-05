const { render } = require('../utils/renderPage');
class SiteController {
  // [GET] /
  getHome = (req, res) => render(req, res, 'home');
  getAboutUs = (req, res) => render(req, res, 'about-us');
}

module.exports = new SiteController();
