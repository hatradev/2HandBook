const searchInput = document.querySelector('.header .search-input');
const btnLogin = document.querySelector('.header .btn-log-in');
const btnSignup = document.querySelector('.header .btn-sign-up');
const announceBtn = document.querySelector('.header .announce-icon');
const announceList = document.querySelector('.header .announce-list');

searchInput.addEventListener('focus', function () {
  searchInput.placeholder = '';
});

searchInput.addEventListener('blur', function () {
  searchInput.placeholder = 'Search...';
});

// User logged in
// btnLogin.parentElement.classList.add('logged-in');

// User has some new notifications
announceBtn.classList.add('has-noti');

// Open and close notification button
announceBtn.addEventListener('click', () => {
  announceBtn.classList.toggle('noti-open');
});
