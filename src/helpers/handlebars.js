const Handlebars = require('handlebars');
const { createPagination } = require('express-handlebars-paginate');
module.exports = {
  accessArr: (arr, index) => arr[index],
  showStar: (stars) => {
    return stars ? stars : 0;
  },
  createPagination,
};
