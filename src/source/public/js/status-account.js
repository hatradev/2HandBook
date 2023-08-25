const stat = document.getElementsByClassName("status");
for (const e of stat) {
  if (e.innerText == "Banned") {
    e.style.color = "#e55039";
  } else if (e.innerText == "Reported") {
    e.style.color = "#fa983a";
  } else if (e.innerText == "Pending" || e.innerText == "Trending") {
    e.style.color = "#2980b9";
  } else {
    e.innerHTML = "Active";
    e.style.color = "#0e760e";
  }
  e.style.fontStyle = "italic";
}
