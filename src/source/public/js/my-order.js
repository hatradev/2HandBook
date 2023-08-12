  document.addEventListener("DOMContentLoaded", function () {
      const evaluateButtons = document.querySelectorAll(".evaluate-button");

      evaluateButtons.forEach((button) => {
          button.addEventListener("click", function () {
              const productId = this.dataset.productId; // Lấy giá trị idProduct từ thuộc tính dataset

              const form = document.querySelector("#evaluateForm");
              form.action = `/evaluate/order-success/${productId}`;
          });
      });
  });
