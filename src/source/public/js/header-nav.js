const searchInput = document.querySelector('.search-input');
const header = document.querySelector('.header');
const nav = document.querySelector('.navbar');
const logoImg = document.querySelector('.logo-img');

// Change style header from dark mode to light mode
window.addEventListener('scroll', function () {
  if (this.scrollY > 0) {
    header.classList.add('light');
    nav.classList.add('light');
    logoImg.src = 'img/logo/logo-dark.png';
  } else {
    header.classList.remove('light');
    nav.classList.remove('light');
    logoImg.src = 'img/logo/logo-light.png';
  }
});

searchInput.addEventListener('focus', function () {
  searchInput.placeholder = '';
});

searchInput.addEventListener('blur', function () {
  searchInput.placeholder = 'Search...';
});
