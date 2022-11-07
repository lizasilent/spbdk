import './styles/index.css';

const search = document.querySelector(".search");
const searchForm = document.querySelector(".search__results");



search.addEventListener("click", openPopup);

function openPopup() {
  searchForm.classList.remove("disabled")
}

