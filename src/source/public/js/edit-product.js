const btnUpdateImage = document.querySelector(".product-image-preview .btn");
const productImagePreview = document.querySelector(
  ".product-image.product-image-preview "
);
const requiredFields = document.querySelectorAll("input[required]");
const editForm = document.getElementById("edit-form");
const saveBtn = document.querySelector(".js-save-btn");

function removeRequiredMessage() {
  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      if (
        !field.nextElementSibling ||
        field.nextElementSibling.textContent == "This field is required !"
      ) {
        field.nextElementSibling.remove();
      }
    });
  });
}

function validateRequiredForm() {
  let flag = true;
  for (const field of requiredFields) {
    if (field.value === "") {
      if (
        !field.nextElementSibling ||
        field.nextElementSibling.textContent != "This field is required !"
      ) {
        field.insertAdjacentHTML(
          "afterend",
          '<p style="color:red;">This field is required !</p>'
        );
      }
      flag = false;
    }
  }

  return flag;
}

saveBtn.addEventListener("click", () => {
  if (validateRequiredForm()) {
    editForm.submit();
  }
});

removeRequiredMessage();

btnUpdateImage?.addEventListener("click", () => {
  productImagePreview.style.display = "none";
});
