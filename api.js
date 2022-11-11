/* eslint-disable no-undef */

import './styles/index.css';

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '10.0.0.63',
  database: 'ut_dk',
  password: '',
  port: 5432,
});


const searchInput = document.querySelector(".search__input");

const text = 'select  nomen_id::text , description::text , ts_rank::text, remain::text, price::text, photopath::text, authorstext::text from get_search($1)'
const values = [searchInput.value]

// select * from get_fullpost(decode('8817002590f365c111ece8a66cae3f43','hex'));
// select * from get_fullphoto(decode('8817002590f365c111ece8a66cae3f43','hex'));
// select * from get_search('маяковский');


// async/await
try {
  const res = await pool.query(text, values)
  console.log(res.rows[0])
} catch (err) {
  console.log(err.stack)
}


