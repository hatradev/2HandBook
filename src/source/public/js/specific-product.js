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

plusBtn.onclick = function () {
  quantity.innerText = Number(quantity.innerText) + 1;
};

minusBtn.onclick = function () {
  var temp = Number(quantity.innerText) - 1;
  temp = temp >= 0 ? temp : 0;
  quantity.innerText = temp;
};
