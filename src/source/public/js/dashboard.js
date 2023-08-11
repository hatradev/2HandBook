var speed = 0;

/* Call this function with a string containing the ID name to
 * the element containing the number you want to do a count animation on.*/
const elts = document.querySelectorAll(".nbr");
let step = 1;

function incEltNbr() {
  elts.forEach((elt) => {
    const endNbr = Number(elt.innerHTML);
    // let step = endNbr / 100;
    incNbrRec(0, endNbr, elt);
  });
}

/*A recursive function to increase the number.*/
function incNbrRec(i, endNbr, elt) {
  if (i <= endNbr) {
    elt.innerHTML = Math.round(i);
    setTimeout(function () {
      //Delay a bit before calling the function again.
      incNbrRec(i + step, endNbr, elt);
    }, speed);
  }
}

window.onload = incEltNbr();
