const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const globalData = this

var selectForm = $(".form-select")
const resultContainer = document.getElementsByClassName('.trend-row');
// selectForm.onchange = async function () {
// 	var selectedValue = selectForm.value.split(',');
// 	// console.log(selectedValue);
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
// 		try {
// 			fetch('/product/all-product/sort', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify(data) //
// 			});
// 			// const html = await response.text();
// 			// resultContainer.innerHTML = html;
// 			// console.log(response)

// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}
// };

