
import './styles/index.css';


const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '10.0.0.63',
  database: 'ut_dk',
  password: '',
  port: 5432,
});


const text = 'select  nomen_id::text , description::text , ts_rank::text, remain::text, price::text, photopath::text, authorstext::text from get_search($1)'
const values = ['Пушкин']

// async/await
try {
  const res = await pool.query(text, values)
  console.log(res.rows[0])
} catch (err) {
  console.log(err.stack)
}

pool.connect(err => {
  if (err) throw err;
  else { queryDatabase(); }
});

function queryDatabase() {

  console.log(`Running query to PostgreSQL server: ${pool.host}`);

  const query = 'SELECT * FROM inventory;';

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


const loader = document.querySelector(".loader");

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


  function listRender(data) {

    cardQuote.textContent = data.activity;
    cardBtn.textContent = "What else?";

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
