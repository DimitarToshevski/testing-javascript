const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const products = [{ name: 'Milk', quantity: 1 }];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/products', (req, res, next) => {
  res.json(products);
});

app.post('/products', (req, res, next) => {
  products.push(req.body);
  res.status(200).json({
    message: 'Product added successfully!'
  });
});

app.listen(3000, (req, res) => {
  console.log('server running on 3000');
});
