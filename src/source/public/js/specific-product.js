async function addCart(id, quantity) {
  try {
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
  } catch (err) {
    console.log(err);
  }
}

const addCartBtn = document.getElementById("js-add-cart-btn");
addCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
