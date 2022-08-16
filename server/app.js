const express = require('express');
const app = express();
const db = require('../database/db.js');

const port = 3005;

app.get('/', (req, res) => {
  res.send("Hello world");
})

// list of products
// options: page: int(1), count: int(5)
app.get('/products', (req, res) => {
  // might not be used by front end?
});

// product level information for specific product id
// options: product_id: int
app.get('/products/:pId', (req, res) => {
  var product_id = req.params.pId;
  console.log('incoming product id', product_id);

});

// product styles
// options: product_id: int
app.get('/products/:pId/styles', (req, res) => {

});

// products related
// options: product_id: int
app.get('products/:pId/related', (req, res) => {

});

app.listen(port, () => {
  console.log('listening on ' + port);
})