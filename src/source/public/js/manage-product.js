const manageProductScreen = document.querySelector('.manage-product');
const manageProductContent = document.querySelector('.manage-product-content');
const deleteBtn = document.querySelector('.manage-product .js-delete-btn');

if (numberOfItems === 0) {
  manageProductContent.classList.add('d-none');
  deleteBtn.classList.add('d-none');
  manageProductScreen.insertAdjacentHTML(
    'beforeend',
    `<p class="text-center" style="font-size: 2rem; margin-top: 2rem;">You haven't add any products! </p>`
  );
} else {
  const mainCheckbox = document.querySelector(
    '.manage-product-titles .manage-product-checkbox'
  );
  const checkboxes = document.querySelectorAll(
    '.manage-product-item .manage-product-checkbox'
  );
  const searchInputManageProduct = document.querySelector(
    '.manage-product .search-input'
  );

  mainCheckbox.addEventListener('click', () => {
    if (mainCheckbox.checked)
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    else
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
  });

  deleteBtn.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) checkbox.parentElement.remove();
      mainCheckbox.checked = false;
    });
  });

  searchInputManageProduct.addEventListener('focus', function () {
    searchInputManageProduct.placeholder = '';
  });

  searchInputManageProduct.addEventListener('blur', function () {
    searchInputManageProduct.placeholder = 'Search for product';
  });
}
