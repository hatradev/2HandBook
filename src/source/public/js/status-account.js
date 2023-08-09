const stat = document.getElementsByClassName('status');
for (const e of stat) {
  if (e.innerText == 'Banned') {
    e.style.color = '#e55039';
    console.log(e.innerHTML);
  } else if (e.innerText == 'Reported') {
    e.style.color = '#fa983a';
    console.log(e.innerHTML);
  } else {
    e.innerHTML = 'Active';
    e.style.color = '#0e760e';
    console.log(e.innerHTML);
  }
  e.style.fontStyle = 'italic';
}
