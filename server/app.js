const express = require('express');
const app = express();
const db = require('../database/db.js');
const models = require('../models/index.js');

const port = 8000;

app.get('/', (req, res) => {
  console.log("Get works!");
  res.send("hello world");
});

// list of products
// options: page: int(1), count: int(5)
app.get('/products', (req, res) => {
  // might not be used by front end?
  var result = Promise.resolve(models.productList());
  result.then((value) => {
    console.log(value);
    res.send(value);
  });
});

// product level information for specific product id
// options: product_id: int
app.get('/products/:pId', (req, res) => {
  const product_id = req.params.pId;
  console.log('incoming product id', product_id);
  var result = Promise.resolve(models.productInfo(product_id));
  result.then((value) => {
    console.log(value);
    res.send(value);
  });
});

// product styles
// options: product_id: int
app.get('/products/:pId/styles', (req, res) => {
  const product_id = req.params.pId;
  console.log('incoming product style req', product_id);
  var result = Promise.resolve(models.productStyles(product_id));
  result.then((value) => {
    console.log(value);
    res.send(value);
  });
});

// products related
// options: product_id: int
app.get('/products/:pId/related', (req, res) => {
  const product_id = req.params.pId;
  console.log('incoming related items req', product_id);
  var result = Promise.resolve(models.relatedProducts(product_id));
  result.then((value) => {
    console.log(value);
    res.send(value);
  })
});

app.listen(port, () => {
  console.log('listening on ' + port);
})