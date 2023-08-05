// render with the first name of the user logged in
render = (req, res, page) => {
  res.render(page, { firstName: req.user ? req.user.firstName : '' });
};
module.exports = {
  render,
};
