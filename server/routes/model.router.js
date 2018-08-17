const express = require('express');
const router = express.Router();

// MONGODB SETUP
// const mongoose = require('mongoose');
// const databaseName = '';
// const mongoURI = `mongodb://localhost:27017/${databaseName}`; // 27017 is the PORT that Mongo is running on
// mongoose.connect(mongoURI, {useNewUrlParser: true}); // {useNewUrlParser: true} <- avoids a warning in the console
// mongoose.connection.on('open', () => console.log('Connected to Mongo'));
// mongoose.connection.on('error', error => console.log('ERROR CONNECTING TO MONGO', error));

// MONGODB SCHEMA AND MODEL
// const Schema = mongoose.Schema;
// const modelSchema = new Schema({
//   property: {type: String, Number, etc.}
// });
// const Model = mongoose.model('modelName', modelSchema);

// POSTGRESQL SETUP
// const pg = require('pg');
// const Pool = pg.Pool;
// const config = {
//   database: 'name', // name of database
//   host: 'localhost',
//   port: 5432,
//   max: 10, // max number of concurrent connections
//   idleTimeoutMillis: 10000 // attepmt to connect for 10 seconds
// };

// const pool = new Pool(config);
// pool.on('connect', () => console.log('postgresql connected!!!'));
// pool.on('error', error => console.log('Error connecting to db', error));


// get route params with "/route/:paramName, then reference it as req.params.paramName"
router.get('/', (req, res) => {
  // MONGODB SAMPLE GET
  // model.find({}) // or something like model.find({amount: {$gt: something, $lt: something}})
  //   .then(models => res.send(models))
  //   .catch(error => res.sendStatus(500));
  // const query = 'SELECT * FROM "table-name";';

  // POSTGRESQL SAMPLE GET
  // pool.query(query)
  //   .then(results => res.send(results.rows))
  //   .catch(error => {
  //     console.log('DB Query Error:', error);
  //     res.sendStatus(500);
  //   });
});

router.post('/', (req, res) => {
  // get data with req.body
  // for posting to MongoDB, use something like...
  // const modelToAdd = new Model(req.body);
  // modelToAdd.save()
  //  .then(() => res.sendStatus(201))
  //  .catch(error => res.sendStatus(500));

  // POSTGRESQL SAMPLE POST
  // const itemToAdd = req.body; // This the data we sent
  //   console.log('In POST route - product:', itemToAdd); // Has a name, size and cost
  //   const query = 'INSERT INTO "table" ("column1", "column2", "column3") VALUES ($1, $2, $3);';
  //   pool.query(query, [itemToAdd.value1, itemToAdd.value2, itemToAdd.value3])
  //     .then(() => res.sendStatus(201))
  //     .catch(error => {
  //       console.log('Error in POST:', error);
  //       res.sendStatus(500);
  //   });
});

router.put('/:id', (req, res) => {
  /* 
  Model.findOne({_id: req.params.id})
    .then(foundModel => {
      //alter model then save in database
    }).catch(error => res.sendStatus(500));
  */

  // POSTGRESQL SAMPLE PUT
  //  const updatedShoe = req.body;
  //  const queryText = `UPDATE "shoes" 
  //                     SET "name" = $1, "cost" = $2, "size" = $3
  //                     WHERE "id" = $4;`;
  //  pool.query(queryText, [updatedShoe.name,
  //                         updatedShoe.cost, 
  //                         updatedShoe.size, 
  //                         updatedShoe.id]).then( (result) => {
  //                             res.sendStatus(200);
  //                         }).catch( (error) => {
  //                             res.sendStatus(500);
  //                         });
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