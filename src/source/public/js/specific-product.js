async function addCart(id, quantity) {
  try {
    if (quantity > 0) {
      let res = await fetch("/product/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, quantity: quantity }),
      });
      let products = await res.json();
      const cartNumber = products.reduce(
        (accum, product) => accum + product.quantity,
        0
      );
      document.getElementById("lblCartCount").innerText = `${cartNumber}`;
      getCart();
    }
  } catch (err) {
    console.log(err);
  }
}

const addCartBtn = document.getElementById("js-add-cart-btn");
addCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var plusBtn = $(".plus-btn");
var minusBtn = $(".minus-btn");
var quantity = $(".quantity-number");
var availabelNumber = $('.available-product span')

plusBtn.onclick = function () {
  let temp = Number(quantity.innerText) + 1
  let fixedNumber = Number(availabelNumber.innerText)
  if (temp <= fixedNumber){
    quantity.innerText = temp
  }
};

minusBtn.onclick = function () {
  var temp = Number(quantity.innerText) - 1;
  temp = temp >= 1 ? temp : 1;
  quantity.innerText = temp;
};

