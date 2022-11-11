import '../styles/index.css';

const searchForm = document.querySelector(".search__results");
const searchInput = document.querySelector(".search__input");
const searchContainer = document.querySelector(".search__container");


if (searchContainer) {
  searchContainer.addEventListener("input", handlePopup);
}



function handlePopup() {
  searchForm.classList.remove("disabled");

  if (searchInput.value === "") {
    searchForm.classList.add("disabled");
  }
}
