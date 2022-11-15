import { data } from "autoprefixer";
import nopic from "./images/nopicture.png";

const searchInput = document.querySelector(".search__input");
// const searchContainer = document.querySelector(".search__container");
const searchList = document.querySelector(".search__list");
const searchForm = document.querySelector(".search__results");
const loader = document.querySelector(".loader");
const resultTemplate = document.querySelector(".s-catalog__template");
const searchInpFull = document.querySelector(".search__input-full");
const searchMoreText = document.querySelector(".search__more-text");

if (searchInput) {
  searchInput.addEventListener("input", handlePopup);
}
if (searchInpFull) {
  searchInpFull.addEventListener("input", handleResults);
}

window.onload = () => {
  const queryString = parseLink();
  console.log("queryString", queryString);
  if (queryString) {
    searchInpFull.value = queryString;
    searchInpFull.dispatchEvent(new Event("input", { bubbles: true }));
  }
};

function getDataByQuery(element, successCallback) {
  let query = element.value;

  fetch(`http://dk.searchsystem.local/api/search.php?q=${query}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        console.log("Всё ок я просто туплю");
        return res.json();
      }
      return Promise.reject(res.statusText);
    })
    .then((data) => {
      // если мы попали в этот then, data — это объект
      showSpinner(true);

      successCallback(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      showSpinner(false);
    });
}

// Спиннер

function showSpinner(isLoading) {
  if (loader) {
    if (isLoading) {
      loader.classList.remove("loader_hidden");
    } else {
      loader.classList.add("loader_hidden");
    }
  }
}

// Открыть попап
function handlePopup() {
  createLink(searchInput.value);

  if (searchInput.value.length > 2) {
    searchForm.classList.remove("disabled");
    getDataByQuery(searchInput, handleFillPopup);
  } else {
    searchForm.classList.add("disabled");
  }
}

function handleResults() {
  getDataByQuery(searchInpFull, handleFillResults);
}

// Создать элемент списка

function createListElement(data) {
  let price = Number(Math.floor(data.price));
  let remain = Number(Math.floor(data.remain));
  let id = data.nomen_id.slice(3);

  return `
<li class="search__item" id="${id}">
<a class="search__item" href="card.html">
  <img class="search__item-image" src="${data.photopath || nopic}" alt=${
    data.authorstext
  }></img>
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

// Вставить элемент списка в разметку

function renderListElement(data) {
  searchList.insertAdjacentHTML("afterbegin", createListElement(data));
}

// Создать элемент сетки

function createSearchResultElement(data) {
  let price = Number(Math.floor(data.price));
  let remain = Number(Math.floor(data.remain));
  let id = data.nomen_id.slice(3);

  return `
  <li class="s__item"> <a href="card.html" id="${id}">
  <div class="s__item-new hidden">Новинка</div>
  <img class="s__item-image" src="${data.photopath || nopic}" alt=${
    data.authorstext
  }></img>
  <div class="s__item-texts">
    <p class="s__item-autor">${data.authorstext}</p>
    <p class="s__item-name">${data.description}</p>
  </div>
  <div class="s__item-pricecontainer">
    <div class="s__item-box">
      <p class="s__item-price">${price}</p>
      <div class="s__item-icon"></div>
    </div>
    <p class="s__item-availability">В наличии ${remain} шт.</p>
    <!-- <p class="s__item-availability red">Нет в наличии</p> -->
  </div>
</a>
</li>
`;
}

function renderFullResult(data) {
  if (resultTemplate) {
    resultTemplate.insertAdjacentHTML(
      "afterbegin",
      createSearchResultElement(data)
    );
  }
}

function createLink(query) {
  searchMoreText.href = `http://dk.searchsystem.local/search-results.html?search=${query}`;
}

function parseLink() {
  const parsedUrl = new URL(window.location.href);
  const searchParam = parsedUrl.searchParams.get("search");

  return searchParam;
}

function handleFillPopup(data) {
  let firstItems = data.slice(0, 20);
  firstItems.forEach((dataObject) => {
    renderListElement(dataObject);
  });
}

function handleFillResults(data) {
  data.forEach((result) => {
    renderFullResult(result);
  });
}

// Карточка товара

function getCardData() {
  let cardId = "8817002590f365c111ece8e1d910b959";

  fetch(`http://dk.searchsystem.local/api/getdata.php?q=${cardId}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        console.log("Всё ок я просто туплю");
        return res.json();
      }
      return Promise.reject(res.statusText);
    })
    .then((data) => {
      renderCardPage(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      showSpinner(false);
    });
}

const cardPage = document.querySelector(".card-page");

function renderCardPage(data) {
  if (cardPage) {
    cardPage.innerHTML = createCard(data);
  }
}

function createCard(data) {
  let price = Number(Math.floor(data.data.price));
  let remaindk = Number(Math.floor(data.data.remain_dk));
  let remainlit = Number(Math.floor(data.data.remain_lit));
  let remaincron = Number(Math.floor(data.data.remain_cron));
  let id = data.data.nomen_id.slice(3);
  console.log(id);

  return `
  <div class="card" id="${id}">
  <div class="card__left-menu">
    <div class="card__photo-block">
      <div class="card__slider slider">
        <div class="slider__arrow-prev disabled"></div>
        <div class="swiper slider__container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slider__photo">
              <img class="slider__photo-img"
                src="https://www.podpisnie.ru/upload/resize_cache/iblock/25e/1262_575_1/u38hevc8s16tugwoc1au0cvqf0w0br4n.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide slider__photo">
              <img class="slider__photo-img"
                src="https://picsum.photos/id/232/112/84"
                alt=""
              />
            </div>
            <div class="swiper-slide slider__photo">
              <img class="slider__photo-img"
                src="https://picsum.photos/id/233/112/84"
                alt=""
              />
            </div>
            <div class="swiper-slide slider__photo">
              <img class="slider__photo-img"
                src="https://picsum.photos/id/234/112/84"
                alt=""
              />
            </div>
            <div class="swiper-slide slider__photo">
              <img class="slider__photo-img"
                src="https://picsum.photos/id/235/112/84"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="slider__arrow-next"></div>
      </div>
      <div class="card__main-block">
        <div class="card__main-photo">
          <img id="main-photo" src="https://www.podpisnie.ru/upload/resize_cache/iblock/725/1262_575_1/13l1ditbsai4154iaqkmxxbo0imlqwl5.jpg" alt=""></div>
      </div>
    </div>
    <div class="card__text-block">
      <div class="card__text-block-box">
        <div class="card__text-block-tab">Аннотация</div>
        <div class="s__item-box">
          <p class="s__item-price card_big-font">${price}</p>
          <div class="s__item-icon card_big-symbol"></div>
        </div>
      </div>
      <p class="card__text-block-description">
       ${data.data.annotation}
      </p>
    </div>
  </div>
  <div class="card__right">
    <div class="card__right-header">${data.description}</div>
    <div class="card-right__main">
      <div class="card__right-template">
        <p>Автор</p>
        <p>${data.data.authorstext}</p>
        <p>Серия</p>
        <p>${data.data.seriesname}</p>
        <p>Издательство</p>
        <p>${data.data.publishername}</p>
        <p>Год</p>
        <p>${data.data.publishingyear}</p>
        <p>Кол-во страниц</p>
        <p>${data.data.pagesnum}</p>
        <p>Язык</p>
        <p>Русский</p>
        <p>ISBN</p>
        <p>${data.data.isbn}</p>
        <p>Артикул</p>
        <p>${data.data.article}</p>
      </div>
    </div>
    <div class="card__right-bottom">
      <p class="card__right-text">Наличие в магазинах</p>
      <div class="card__right-template no-border">
        <p>Невский, 28</p>

        ${
          remaindk > 0
            ? `<p class="green"> В наличии ${remaindk} шт. / 2 этаж, секция В, полка 2
        </p>`
            : `<p class="red">Нет в наличии</p>`
        }

        <p>Литейный, 64</p>

        ${
          remainlit > 0
            ? `<p class="green">
        В наличии ${remainlit} шт. / 2 этаж, секция В, полка 2
      </p>`
            : `<p class="red">Нет в наличии</p>`
        }


        <p>Кронштадт</p>

        ${
          remaincron > 0
            ? ` <p class="green">
          В наличии ${remaincron} шт. / 1 этаж, секция А, полка 4
        </p>`
            : `<p class="red">Нет в наличии</p>`
        }

      </div>
    </div>
  </div>
</div>`;
}

getCardData();

/*  */

//  <p>Автор</p>
//                     <p>Николев А.</p>
//                     <p>Художник</p>
//                     <p>Алексеева А.</p>
//                     <p>Переводчик</p>
//                     <p>Дроздов Д.</p>
//                     <p>Серия</p>
//                     <p>Путешествия</p>
//                     <p>Издательство</p>
//                     <p>Носорог</p>
//                     <p>Год</p>
//                     <p>2022</p>
//                     <p>Переплёт</p>
//                     <p>Твердый</p>
//                     <p>Кол-во страниц</p>
//                     <p>456</p>
//                     <p>Формат</p>
//                     <p>170/240 мм</p>
//                     <p>Язык</p>
//                     <p>Русский</p>
//                     <p>ISBN</p>
//                     <p>438-934-629-4</p>
//                     <p>Артикул</p>
//                     <p>5936075</p>
