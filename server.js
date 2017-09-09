'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
// const bodyParser = require('body-parser');
// const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

const conString = ''; //TODO when database is set-up
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.log(err));

// app.use(bodyParser.json());
app.use(express.static("./public"));

app.get('/toilets', (req, res) => {
  client.query(`
    SELECT * FROM toilets
    INNER JOIN reviews
      ON toilets.toilet_id = reviews.toilet_id;
    `)
    .then(result => response.send(result.rows))
    .catch(console.error);
});

loadDB();


//Database loader
function loadDB(){
  client.query(`
    CREATE TABLE IF NOT EXISTS
    toilets(
      toilet_id SERIAL PRIMARY KEY,
      location VARCHAR(30),
      occupancy INTEGER,
      soap VARCHAR(5),
      drying VARCHAR(10),
      genderNeutral VARCHAR(5),
      usage VARCHAR(5)
    )
  `)
  .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS
    reviews(
      review_id SERIAL PRIMARY KEY,
      toilet_id INTEGER NOT NULL REFERENCES toilets(toilet_id),
      overallQuality INTEGER NOT NULL,
      tpQuality INTEGER NOT NULL,
      comments VARCHAR(255)
    )
  `)
  .catch(console.error);
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
