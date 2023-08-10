// evaluateButton.js

document.addEventListener("DOMContentLoaded", function() {
  // Lặp qua từng đơn hàng trong ordersData
  orders.forEach(order => {
    order.detail.forEach(detail => {
      const form = document.querySelector(`#form_${detail.idProduct._id}`);
      const evaluateButton = document.querySelector(`#evaluateButton_${detail.idProduct._id}`);

      form.addEventListener("submit", function() {
        evaluateButton.disabled = true;
        evaluateButton.classList.add("disabled");
      });
    });
  });
});
