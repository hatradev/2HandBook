const pagination = document.querySelector('.pagination');
const numberOfItems = 60; // assume we have 60 items from database
if (numberOfItems === 0) pagination.classList.add('d-none');
else {
  const numPages = Math.ceil(numberOfItems / 10);
  let currentPage = 1;
  let leftMost = 1;
  const initPagination = () => {
    pagination.innerHTML = `<li class='pagination-item col-2 text-center'>
      <a class='pagination-link' href='#' aria-label='Previous all'>
        <i class='fa-regular fa-chevrons-left'></i>
      </a>
    </li>
    <li class='pagination-item col text-center'>
      <a class='pagination-link' href='#' aria-label='Previous'>
        <i class='fa-regular fa-chevron-left'></i>
      </a>
    </li>`;
    for (let i = 1; i <= Math.min(numPages, 3); i++) {
      pagination.insertAdjacentHTML(
        'beforeend',
        `<li class="pagination-item col text-center">
          <a class="pagination-link" href="#">
            ${i}
          </a>
        </li>`
      );
    }
    pagination.insertAdjacentHTML(
      'beforeend',
      `<li class='pagination-item col text-center'>
        <a class='pagination-link' href='#' aria-label='Next'>
          <i class='fa-regular fa-chevron-right'></i>
        </a>
      </li>
      <li class='pagination-item col-2 text-center'>
        <a class='pagination-link' href='#' aria-label='Next all'>
          <i class='fa-regular fa-chevrons-right'></i>
        </a>
      </li>`
    );
  };
  initPagination();
  const paginationLinks = document.querySelectorAll('.pagination-link');
  const paginationDesc = document.querySelector('.pagination-description');

  const disableCurrentPage = () => {
    paginationLinks[currentPage - leftMost + 2].classList.remove(
      'pagination-active'
    );
  };

  const updateDescription = () => {
    paginationDesc.textContent = `${(currentPage - 1) * 10 + 1} - ${Math.min(
      currentPage * 10,
      numberOfItems
    )} of ${numberOfItems} items`;
  };

  const updatePages = () => {
    for (let i = 2; i < paginationLinks.length - 2; i++) {
      paginationLinks[i].textContent = `${leftMost + i - 2}`;
    }
  };

  const moveToPage = (page) => {
    disableCurrentPage();
    if (page < leftMost) {
      leftMost = page;
      updatePages();
    } else if (page > leftMost + 2) {
      leftMost = page - 2;
      updatePages();
    }
    currentPage = page;
    paginationLinks[page - leftMost + 2].classList.add('pagination-active');
    updateDescription();
  };

  paginationLinks[2].classList.add('pagination-active');
  updateDescription();
  paginationLinks.forEach((paginationLink, idx) => {
    paginationLink.addEventListener('click', function () {
      if (idx === 0) {
        moveToPage(1);
      } else if (idx === 1) {
        moveToPage(Math.max(1, currentPage - 1));
      } else if (idx === paginationLinks.length - 1) {
        moveToPage(numPages);
      } else if (idx === paginationLinks.length - 2) {
        moveToPage(Math.min(currentPage + 1, numPages));
      } else {
        moveToPage(Number(this.textContent));
      }
    });
  });
}
