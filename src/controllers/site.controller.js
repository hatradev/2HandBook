class SiteController {
  // [GET] /
  getHomepage(req, res) {
    res.render('home', { showHeader: true, showFooter: true });
  }
}

module.exports = new SiteController();
