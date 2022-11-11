function getDataByQuery(query) {
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
      showSpinner(true);
      createListElement(data);

    })
    .catch((err) => {
      // cardErr.textContent = `Ошибка: ${err}`;
      console.log(err);

    })
    .finally(() => {
      showSpinner(false);
    });
}

  cardBtn.addEventListener("click", getDataByQuery);


  const loader = document.querySelector(".loader");


function createListElement(data) {
const searchItemImage = document.querySelector(".search__item-image");
const searchItemAuthor = document.querySelector(".search__item-autor");
const searchItemName = document.querySelector(".search__item-name");
const searchItemPrice = document.querySelector(".search__item-price");


searchItemAuthor.textContent = data.authorstext;
searchItemName.textContent = data.description;
searchItemPrice.textContent = data.price;
searchItemImage.src = data.photopath;

  return listElement;
}

const searchList = document.quertSelector(".search__list")

function renderCard(data) {
  searchList.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data);
});

