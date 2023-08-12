const header = document.querySelector(".header");
const nav = document.querySelector(".navbar");
const logoImg = document.querySelector(".logo-img");

const turnOnLightMode = () => {
  header.classList.add("light");
  nav.classList.add("light");
  logoImg.src = "/img/logo/logo-dark.png";
};

const turnOffLightMode = () => {
  header.classList.remove("light");
  nav.classList.remove("light");
  logoImg.src = "/img/logo/logo-light.png";
};

turnOffLightMode();

window.addEventListener("scroll", function () {
  if (this.scrollY > 0) turnOnLightMode();
  else turnOffLightMode();
});
