
import nopic from "./images/nopicture.png";

const searchInput = document.querySelector(".search__input");
const searchContainer = document.querySelector(".search__container");
const searchList = document.querySelector(".search__list");
const searchForm = document.querySelector(".search__results");
const loader = document.querySelector(".loader");


function getDataByQuery() {

  let query = searchInput.value;

  fetch(`http://dk.searchsystem.local/api/search.php?q=${query}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.statusText);
    })
    .then((data) => {
      // если мы попали в этот then, data — это объект
      showSpinner(true);
      // handlePopup();
      let firstItems = data.slice(0, 20);
      firstItems.forEach((dataObject) => {
        renderCard(dataObject);
      });
    })
    .catch((err) => {
      console.log( `Ошибка: ${err}`);
    })
    .finally(() => {
      showSpinner(false);
    });
}

// Спиннер

function showSpinner(isLoading) {
  if (isLoading) {
    console.log("я загружаюсь");
    loader.classList.remove("loader_hidden");
  } else {
    loader.classList.add("loader_hidden");
  }
}

// Открыть попап

if (searchContainer) {
  searchContainer.addEventListener("input", handlePopup);
}

function handlePopup() {

  if (searchInput.value.length > 2) {
    searchForm.classList.remove("disabled");
    getDataByQuery();
  }

  else {
    searchForm.classList.add("disabled");
  }
}

// Создать элемент списка

function createListElement(data) {

  let price = Number(Math.floor(data.price));
  let remain = Number(Math.floor(data.remain));


  return `
<li class="search__item">
<a class="search__item" href="card.html">
  <img class="search__item-image" src="${data.photopath || nopic}" alt=${data.authorstext}></img>
  <div class="search__item-texts">
    <p class="search__item-autor">${data.authorstext}</p>
    <p class="search__item-name">${data.description}</p>
  </div>
  <div class="search__item-pricecontainer">
    <div class="search__item-box">
      <p class="search__item-price">${price}</p>
      <div class="search__item-icon"></div>
    </div>
    <p class="search__item-availability">
      В наличии ${remain} шт.
    </p>
  </div>
</a>
</li>
`;
}


function renderCard(data) {
  searchList.insertAdjacentHTML('afterbegin', createListElement(data));
}






