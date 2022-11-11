const searchInput = document.querySelector(".search__input");

function getDataByQuery() {
  let query = searchInput.value;

  fetch(`http://api.searchsystem.local/search.php?q=${query}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((data) => {
      // если мы попали в этот then, data — это объект
      console.log(data);
      showSpinner(true);

      data.forEach((dataObject) => {
        renderCard(dataObject);
      });
    })
    .catch((err) => {
      // cardErr.textContent = `Ошибка: ${err}`;
      console.log(err);
    })
    .finally(() => {
      showSpinner(false);
    });
}

const searchContainer = document.querySelector(".search__container");

searchContainer.addEventListener("input", getDataByQuery);

function createListElement(data) {
  return `
<li class="search__item">
<a class="search__item" href="card.html">
  <img class="search__item-image" src="${data.photopath}" alt=""></img>
  <div class="search__item-texts">
    <p class="search__item-autor">${data.authorstext}</p>
    <p class="search__item-name">${data.description}</p>
  </div>
  <div class="search__item-pricecontainer">
    <div class="search__item-box">
      <p class="search__item-price">${data.price}</p>
      <div class="search__item-icon"></div>
    </div>
    <p class="search__item-availability">
      В наличии ${data.remain} шт.
    </p>
  </div>
</a>
</li>
`;
}

const searchList = document.quertSelector(".search__list");

function renderCard(data) {
  searchList.prepend(createListElement(data));
}

// Спиннер

const loader = document.querySelector(".loader");

function showSpinner(isLoading) {
  if (isLoading) {
    loader.classList.remove("loader_hidden");
  } else {
    loader.classList.add("loader_hidden");
  }
}
