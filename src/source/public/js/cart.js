const cartBtn = document.querySelector('.header .cart-icon');
const cartScreen = document.querySelector('.cart');
const cartCloseBtn = document.querySelector('.cart .cart-close-btn');
const cartSlider = document.querySelector('.cart .cart-slider');
const cartList = document.querySelector('.cart .product-list');
const cartPrice = document.querySelector('.cart .cart-price');
const cartProductBtns = document.querySelectorAll('.cart a.btn');
const productItemCloseBtns = document.querySelectorAll(
  '.cart .product-item .product-close-btn'
);
const checkEmptyCart = () => {
  if (cartList.children.length === 0) {
    cartList.innerHTML = `<p class="cart-empty-text text-center mt-5 ">You don't have any products in your cart !</p>`;
    cartPrice.classList.add('d-none');
    cartProductBtns.forEach((cartProductBtn) => {
      cartProductBtn.classList.add('d-none');
    });
  }
};

cartBtn.addEventListener('click', () => {
  checkEmptyCart();
  cartScreen.classList.add('d-flex');
  setTimeout(() => {
    cartSlider.classList.add('slide');
  });
});

cartCloseBtn.addEventListener('click', () => {
  cartSlider.classList.remove('slide');
  setTimeout(() => {
    cartScreen.classList.remove('d-flex');
  }, 500);
});

productItemCloseBtns.forEach((productItemCloseBtn) => {
  productItemCloseBtn.addEventListener('click', () => {
    productItemCloseBtn.parentElement.parentElement.remove();
    checkEmptyCart();
  });
});
