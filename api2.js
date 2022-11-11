pool.connect(err => {
  if (err) throw err;
  else { queryDatabase(); }
});

function queryDatabase() {

  console.log(`Running query to PostgreSQL server: ${pool.host}`);

  const query = 'select * from get_fullpost';

  pool.query(query)
      .then(res => {
          const rows = res.rows[0];

          rows.map(row => {
              console.log(`Read: ${JSON.stringify(row)}`);
          });

          process.exit();
      })
      .catch(err => {
          console.log(err);
      });
}



function getDataByQuery(query) {
  fetch(`http://10.0.0.55/search?q=${query}`, {
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
      listRender(data);

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



  function listRender(data) {

    searchItemAuthor.textContent = data.activity;
    searchItemName.textContent = "What else?";
    searchItemPrice.textContent =

      console.log(data);
  }

// const activityType = formSelect.value;
// cardBtn2.addEventListener("click", getRandomActivitybyType(activityType));



function showSpinner(isLoading) {
  if (isLoading) {
    loader.classList.remove("loader_hidden");

  } else {
    loader.classList.add("loader_hidden");
    // cardErr.classList.remove("card__err_hidden");
  }
}

module.exports = pool


const searchItem = document.querySelector(".search__item");
const searchItemImage = document.querySelector(".search__item-image");
const searchItemAuthor = document.querySelector(".search__item-autor");
const searchItemName = document.querySelector(".search__item-name");
const searchItemPrice = document.querySelector(".search__item-price");
