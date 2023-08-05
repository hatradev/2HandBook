// render with information of the user has logged in
render = (req, res, page) => {
  res.render(page, { firstName: req.user ? req.user.firstName : '' });
};
module.exports = {
  render,
};
