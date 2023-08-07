const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const detailBtns = $$('.details-btn')
const modalBtns = $$('.item-modal')
const mesBtns = $$('.message')

for (const detailBtn of detailBtns) {
	detailBtn.onclick = function () {
		for (const modalBtn of modalBtns) {
			modalBtn.classList.add("d-none")
		}
		for (const mesBtn of mesBtns) {
			mesBtn.classList.add("d-none")
		}

		const id = detailBtn.getAttribute('data-id')
		console.log(detailBtn.getAttribute('data-id'))

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
	}
}

const btnSend = $(".btn-success");
btnSend.addEventListener("click", fetchApiData);

function fetchApiData(e) {
	e.preventDefault();
	const dataToSend = {
		name: "John",
		age: 30
	};

	fetch("order/manage-order/accept", {
		method: "DELETE", // Phương thức yêu cầu là POST
		headers: {
			"Content-Type": "application/json" // Tiêu đề Content-Type để chỉ định định dạng của body
		},
		body: JSON.stringify(dataToSend) // Trường body được đặt ở đây, chuyển đổi thành JSON trước khi gửi
	})
		.then(response => console.log(response.json()))
		// .then(data => console.log(data))
		.catch(error => console.error(error));
}