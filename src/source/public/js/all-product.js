const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const globalData = this

var selectForm = $(".form-select")

// Test
// const products = $$(".trend-card:not(.d-none)")
// 		var productsId = []
// 		products.forEach(it => {
// 			productsId.push(it.getAttribute('data-id'))
// 		});
// console.log(productsId)
const resultContainer = document.getElementsByClassName('.trend-row');
selectForm.onchange = async function () {
	var selectedValue = selectForm.value.split(',');
	// console.log(selectedValue);
	if (selectedValue != "default") {
		const products = $$(".trend-card:not(.d-none)")
		var productsId = []
		products.forEach(it => {
			productsId.push(it.getAttribute('data-id'))
		});

		var data = {
			type: selectedValue,
			productsId: productsId,
		}

		// console.log(data)

		// fetch('/product/all-product/sort', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(data)
		// })
			// .then(response => {
			// 	// if (!response.ok) {
			// 	// 	throw new Error('Có lỗi khi gọi API');
			// 	// }
			// 	// // Phân tích dữ liệu JSON từ kết quả trả về
			// 	// return response.json();
			// })
			// // .then(data => {
			// // 	// Xử lý dữ liệu nhận được từ API
			// // 	console.log(data);
			// // })
			// .catch(error => {
			// 	// Xử lý lỗi nếu có
			// 	console.error(error);
			// });
			try {
				fetch('/product/all-product/sort', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify(data) //
				});
				// const html = await response.text();
				// resultContainer.innerHTML = html;
				// console.log(response)

			  } catch (error) {
				console.error(error);
			  }
	}
};

// selectForm.onchange = function () {
// 	var selectedValue = selectForm.value.split(',');
// 	console.log(selectedValue);
// 	if (selectedValue != "default") {
// 		const products = $$(".trend-card:not(.d-none)")
// 		var productsId = []
// 		products.forEach(it => {
// 			productsId.push(it.getAttribute('data-id'))
// 		});

// 		var data = {
// 			type: selectedValue,
// 			productsId: productsId,
// 		}

// 		fetch('/product/all-product/sort', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify(data)
// 		})
// 	}
// };

