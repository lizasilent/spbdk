
const searchInput = document.querySelector(".search__input");
const searchContainer = document.querySelector(".search__container");
// const searchForm = document.querySelector(".search__results");
const searchList = document.querySelector(".search__list");


function getDataByQuery() {

  let query = searchInput.value;

  fetch(`http://api.searchsystem.local/search.php?q=${query}`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.statusText);
    })
    .then((data) => {
      console.log(data);
      // если мы попали в этот then, data — это объект
      showSpinner(true);
      data.forEach((dataObject) => {
        console.log(dataObject);
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

// function getData() {

//   fetch("http://api.searchsystem.local/getdata.php?q=8817002590f365c111ece8e1d910b959", {
//     method: "GET",
//     mode: 'no-cors',
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(res.statusText);
//     })
//     .then((data) => {
//       console.log(data);
//       // если мы попали в этот then, data — это объект
//     })
//     .catch((err) => {
//       console.log( `Ошибка: ${err}`);
//     })
//     .finally(() => {
//       showSpinner(false);
//     });
// }




if (searchContainer) {
  // searchContainer.addEventListener("input", handlePopup);
  searchContainer.addEventListener("input", getDataByQuery);
}



// function handlePopup() {
//   searchForm.classList.remove("disabled");

//   if (searchInput.value === "") {
//     searchForm.classList.add("disabled");
//   }
// }


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



function renderCard(data) {
  searchList.prepend(createListElement(data));
  console.log(data);
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
