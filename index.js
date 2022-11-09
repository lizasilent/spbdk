import './styles/index.css';
import './src/slider.js';

const search = document.querySelector(".search");
const searchForm = document.querySelector(".search__results");


search.addEventListener("input", openPopup);

function openPopup() {
  searchForm.classList.remove("disabled")
}


