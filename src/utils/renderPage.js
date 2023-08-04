// render with information of the user has logged in
render = (req, res, page) => {
  res.render(page, { lastName: req.user ? req.user.lastName : '' });
};
module.exports = {
  render,
};
