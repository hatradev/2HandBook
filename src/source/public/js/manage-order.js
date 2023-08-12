const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var detailBtns = $$('.details-btn')
var modalBtns = $$('.item-modal')
var mesBtns = $$('.message')
var hanldeOrderForm = document.forms['delete-course-form']
var rejectBtn = $('.btn-delete')
var acceptBtn = $('.btn-accept')
var signBtns = $$('.sign-btn')
var idOrderArr = []
var idOrder

document.addEventListener('DOMContentLoaded', function () {

	// Handle details button
	for (const detailBtn of detailBtns) {

		if (detailBtn.getAttribute('data-status') != 'pending') {
			idOrderArr.push(detailBtn.getAttribute('data-id'))
		}

		detailBtn.onclick = function () {
			for (const modalBtn of modalBtns) {
				modalBtn.classList.add("d-none")
			}
			for (const mesBtn of mesBtns) {
				mesBtn.classList.add("d-none")
			}

			id = detailBtn.getAttribute('data-id')
			idOrder = id

			for (const orderBtn of modalBtns) {
				if (orderBtn.getAttribute('data-id') == id) {
					orderBtn.classList.remove("d-none")
				}
			}
			for (const orderBtn of mesBtns) {
				if (orderBtn.getAttribute('data-id') == id) {
					orderBtn.classList.remove("d-none")
				}
			}

			if (idOrderArr.includes(id)) {
				acceptBtn.classList.add('d-none')
				rejectBtn.classList.add('d-none')
			} else {
				acceptBtn.classList.remove('d-none')
				rejectBtn.classList.remove('d-none')
				acceptBtn.setAttribute('data-id',id)
				rejectBtn.setAttribute('data-id',id)
			}
		}
	}
	// Handle reject and accept button
	rejectBtn.onclick = function () {
		if (idOrder) {
			hanldeOrderForm.action = '/order/manage-order/' + idOrder + '/reject?_method=PUT'
			hanldeOrderForm.submit()
		}
	}
	acceptBtn.onclick = function (e) {
		e.preventDefault()
		if (idOrder) {
			hanldeOrderForm.action = '/order/manage-order/' + idOrder + '/accept?_method=PUT'
			// hanldeOrderForm.submit()
			checkQuantity(idOrder)
		}
	}

	// Handle sign button
	for (var btn of signBtns) {
		btn.classList.remove('bg-success', 'bg-primary', 'bg-danger')
		if (btn.textContent == "successful") {
			btn.classList.add('bg-success')
		} else if (btn.textContent == "pending") {
			btn.classList.add('bg-primary')
		} else if (btn.textContent == "cancelled") {
			btn.classList.add('bg-danger')
		}
	}

// 	var acceptBtn = $('.btn-accept')
// 	// console.log(acceptBtn)
// 	// acceptBtn.onsubmit = function (event) {
// 	// 	event.preventDefault()
// 	// 	console.log(123)
// 	// }
// 	acceptBtn.on('submit', function(event) {
//     event.preventDefault();
//     console.log(123);
//     // Đoạn mã xử lý sau khi nút được nhấn
// });

	async function checkQuantity(id) { //quantityUser
		try {
			let res = await fetch("/order/quantity", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: id }),
			});
			let order = await res.json();
			console.log(order[0].detail[0].quantity)

		} catch (err) {
			console.log("sai");
		}
	}

})