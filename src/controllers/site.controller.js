class SiteController {
  // [GET] /
  getHome = (req, res) => {
    console.log(req.session);
    console.log(req.session.cookie.maxAge);
    res.render('home');
  };
  getAboutUs = (req, res) => {
    res.render('about-us');
  };
}

module.exports = new SiteController();
