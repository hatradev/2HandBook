const Handlebars = require('handlebars')

module.exports = {
	accessArr: (arr, index) => arr[index],
	showStar: (stars) => {return stars ? stars : 0},
}