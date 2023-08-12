const manageProductScreen = document.querySelector(".manage-product");
const manageProductContent = document.querySelector(".manage-product-content");
const deleteBtn = document.querySelector(".manage-product .js-delete-btn");

if (numberOfItems === 0) {
  manageProductContent.insertAdjacentHTML(
    "beforeend",
    `<p class="text-center alert alert-warning" style="font-size: 2rem; margin-top: 2rem;">You haven't add any products! </p>`
  );
} else {
  window.onload = () => {
    console.log("Hi");
    if (!document.querySelector(".manage-product-item")) {
      // Không có sản phẩm nào ở trang hiện tại nên load về trang đầu tiên
      // Xử lí tạo đường dẫn mới chỉ thay ?page=currentPage
      let newUrl = window.location.href;
      newUrl = newUrl.split("page=");
      if (newUrl[1]) {
        newUrl[1] = newUrl[1].slice(1);
        newUrl = newUrl[0] + `page=1` + newUrl[1];
      } else {
        newUrl = newUrl[0] + `?page=1`;
      }
      console.log(newUrl);
      // fetch(newUrl, {
      //   method: "GET",
      // });
      window.location.href = newUrl;
    }
  };

  const mainCheckbox = document.querySelector(
    ".manage-product-titles .manage-product-checkbox"
  );
  const checkboxes = document.querySelectorAll(
    ".manage-product-item .manage-product-checkbox"
  );
  const searchInputManageProduct = document.querySelector(
    ".manage-product .search-input"
  );

  mainCheckbox.addEventListener("click", () => {
    if (mainCheckbox.checked)
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    else
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
  });

  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        fetch(`/product/delete/${checkbox.value}?page=${currentPage}`, {
          method: "POST",
          redirect: "follow",
        })
          .then((res) => {
            console.log(res);
            if (res.redirected) {
              window.location.href = res.url;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        checkbox.parentElement.remove();
      }
      mainCheckbox.checked = false;
    });
  });

  searchInputManageProduct.addEventListener("focus", function () {
    searchInputManageProduct.placeholder = "";
  });

  searchInputManageProduct.addEventListener("blur", function () {
    searchInputManageProduct.placeholder = "Search for product";
  });
}
