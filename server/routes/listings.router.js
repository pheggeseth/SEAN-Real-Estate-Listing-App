const express = require('express');
const router = express.Router();

// POSTGRESQL SETUP
// Database: "real_estate"
// CREATE TABLE "listings" (
// 	"id" serial primary key,
// 	"cost" int,
// 	"sqft" int,
// 	"type" varchar(20),
// 	"city" varchar(20),
// 	"image_path" varchar(20)
// );

const pg = require('pg');
const Pool = pg.Pool;
const config = {
  database: 'real_estate', // name of database
  host: 'localhost',
  port: 5432,
  max: 10, // max number of concurrent connections
  idleTimeoutMillis: 10000 // attepmt to connect for 10 seconds
};

const pool = new Pool(config);
pool.on('connect', () => console.log('postgresql connected!!!'));
pool.on('error', error => console.log('Error connecting to db', error));


// get route params with "/route/:paramName, then reference it as req.params.paramName"
router.get('/:type', (req, res) => {
  const query = `SELECT * FROM "listings" WHERE "type" = $1;`;
  pool.query(query, [req.params.type])
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log('DB Query Error:', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const listingToAdd = req.body;
  /*{
    cost: int,
    sqft: int,
    type: string,
    city: string,
    image_path: string
  }*/
  console.log('In POST route - listing:', listingToAdd);
  console.log('values:', Object.values(listingToAdd));
  
  const query = 'INSERT INTO "listings" ("cost", "sqft", "type", "city", "image_path") VALUES ($1, $2, $3, $4, $5);';
  pool.query(query, [listingToAdd.cost, listingToAdd.sqft, listingToAdd.type, listingToAdd.city, listingToAdd.image_path])
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.log('Error in POST:', error);
      res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  // Model.findByIdAndRemove(req.params.id)
  //  .then(response => res.sendStatus(201))
  //  .catch(() => res.sendStatus(500));

  // POSTGRESQL SAMPLE DELETE
  // const idOfShoeToDelete = req.params.id;
  //   console.log('deleting ', idOfShoeToDelete);
  //   const queryText = 'DELETE FROM "shoes" WHERE "id" = $1;';
  //   pool.query(queryText, [idOfShoeToDelete]).then((result) => {
  //       res.sendStatus(200);
  //   }).catch( (error) => {
  //       console.log('Error in delete', error);
  //       res.sendStatus(500);
  //   });
});

module.exports = router;