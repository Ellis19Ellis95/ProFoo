const paginationContainer = document.querySelector('.pagination');
  const pageNumbersContainer = document.querySelector('.page-numbers');
  const prevPageButton = document.querySelector('.prev-page');
  const nextPageButton = document.querySelector('.next-page');

  // Функція для відображення пагінації
  function displayPagination(pageNumber, totalPages) {
    pageNumbersContainer.textContent = '';

    // Логіка для великої кількості сторінок з трикрапками
    const maxVisiblePages = 5; // Максимальна кількість видимих номерів сторінок
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    
    let startPage = pageNumber - halfMaxVisiblePages;
    let endPage = pageNumber + halfMaxVisiblePages;
    
    if (startPage < 1) {
      startPage = 1;
      endPage = maxVisiblePages;
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxVisiblePages + 1;
      if (startPage < 1) {
        startPage = 1;
      }
    }
    
    if (startPage > 1) {
      pageNumbersContainer.innerHTML += `<span class="page-number">1</span>`;
      if (startPage > 2) {
        pageNumbersContainer.innerHTML += `<span class="ellipses">...</span>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageNumberSpan = document.createElement('span');
      pageNumberSpan.textContent = i;
      pageNumberSpan.classList.add('page-number');
      if (i === pageNumber) {
        pageNumberSpan.classList.add('active');
      }
      pageNumbersContainer.appendChild(pageNumberSpan);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbersContainer.innerHTML += `<span class="ellipses">...</span>`;
      }
      pageNumbersContainer.innerHTML += `<span class="page-number">${totalPages}</span>`;
    }
  }

  // Ваша пагінація з роботою кліків на сторінки та кнопки "Previous" та "Next"
  // ...
