const Handlebars = require('handlebars')

module.exports = {
	accessArr: (arr, index) => arr[index],
	showStar: (stars) => { return stars ? stars : 0 },
	convertDate: (str) => {
		dateField = new Date(str)
		// Lấy ngày tháng năm từ đối tượng Date
		const originalDate = dateField;
		const day = originalDate.getDate();
		const month = originalDate.getMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1
		const year = originalDate.getFullYear();
		const hours = originalDate.getHours();
		const minutes = originalDate.getMinutes();
		return `${hours}:${minutes} ${day}/${month}/${year}`
	},
	increaseIndex: (index,i) => index + i,
	// originUrl: () => window.location.origin,
}