const searchInput = document.querySelector('.header .search-input');
searchInput.addEventListener('focus', function () {
  searchInput.placeholder = '';
});

searchInput.addEventListener('blur', function () {
  searchInput.placeholder = 'Search...';
});
