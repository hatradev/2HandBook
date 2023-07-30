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

// Check if the cart is empty or not, and then display the text, remove the button view and pay
const checkEmptyCart = () => {
  if (cartList.children.length === 0) {
    cartList.innerHTML = `<p class="cart-empty-text text-center mt-5 ">You don't have any products in your cart !</p>`;
    cartPrice.classList.add('d-none');
    cartProductBtns.forEach((cartProductBtn) => {
      cartProductBtn.classList.add('d-none');
    });
  }
};

// Turn on the cart screen
const turnOnCartScreen = () => {
  checkEmptyCart();
  cartScreen.classList.add('d-flex');
  setTimeout(() => {
    cartSlider.classList.add('slide');
  });
};

// Turn off the cart screen
const turnOffCartScreen = () => {
  cartSlider.classList.remove('slide');
  setTimeout(() => {
    cartScreen.classList.remove('d-flex');
  }, 500);
};

//  ================ Add event listener  =================
// For each of product item close button
productItemCloseBtns.forEach((productItemCloseBtn) => {
  productItemCloseBtn.addEventListener('click', () => {
    productItemCloseBtn.parentElement.parentElement.remove();
    checkEmptyCart();
  });
});

// For the cart button on the header
cartBtn.addEventListener('click', turnOnCartScreen);

// For the cart close button in the cart slider
cartCloseBtn.addEventListener('click', turnOffCartScreen);

// For the overlay on the left of the cart slider
cartScreen.addEventListener('click', turnOffCartScreen);

// For stopping bubbling from the child elements in the cart slider
cartSlider.addEventListener('click', (e) => {
  e.stopPropagation();
});
