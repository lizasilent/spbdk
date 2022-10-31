import './styles/index.css';

// const cardQuote = document.querySelector(".card__quote");
// const card1 = document.getElementById("card1");
// const cardBtn = card1.querySelector(".card__button");
// const loader = document.querySelector(".loader");
// const cardErr = document.querySelector(".card__err");
// const formSelect = document.querySelector(".form__select");
// const card2 = document.getElementById("card2");
// const cardBtn2 = card2.querySelector(".card__button");



// function getData() {
//   fetch("http://www.boredapi.com/api/activity/", {
//     method: "GET",
//   })
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }

//     return Promise.reject(res.status);
//   })
//     .then((data) => {
//       // если мы попали в этот then, data — это объект
//       showSpinner(true);
//       cardRender(data);

//     })
//     .catch((err) => {
//       cardErr.textContent = `Ошибка: ${err}`;

//     })
//     .finally(() => {
//       showSpinner(false);
//     });
// }


// function getRandomActivitybyType(type) {
//   fetch(`http://www.boredapi.com/api/activity?type=:${type}`, {
//     method: "GET",
//   })
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }

//     return Promise.reject(res.status);
//   })
//     .then((data) => {
//       // если мы попали в этот then, data — это объект
//       showSpinner(true);
//       cardRender(data);

//     })
//     .catch((err) => {
//       cardErr.textContent = `Ошибка: ${err}`;
//       console.log(err);

//     })
//     .finally(() => {
//       showSpinner(false);
//     });
// }

//   cardBtn.addEventListener("click", getRandomActivity);


//   function cardRender(data) {

//     cardQuote.textContent = data.activity;
//     cardBtn.textContent = "What else?";

//     // grammar check failed, исправляем ошибку в тексте, подгруженного с апи

//     if (data.activity === "Practice coding in your favorite lanaguage") {
//        cardQuote.textContent = "Practice coding in your favorite language"
//         }


//   }

// // const activityType = formSelect.value;
// // cardBtn2.addEventListener("click", getRandomActivitybyType(activityType));



// function showSpinner(isLoading) {
//   if (isLoading) {
//     loader.classList.remove("loader_hidden");

//   } else {
//     loader.classList.add("loader_hidden");
//     cardErr.classList.remove("card__err_hidden");
//   }
// }

