import './styles/index.css';
import './src/slider.js';

const search = document.querySelector(".search");
const searchForm = document.querySelector(".search__results");
const searchInput = document.querySelector(".search__input");


search.addEventListener("input", handlePopup);


function handlePopup() {
  searchForm.classList.remove("disabled");

  if (searchInput.value === "") {
    searchForm.classList.add("disabled");
  }
}
