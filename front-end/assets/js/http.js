const axios = require('axios');

const fetchProducts = () => {
  return axios.get('http://localhost:3000/products');
};

const addNewProduct = (name, quantity) => {
  return axios.post('http://localhost:3000/products', { name, quantity });
};

module.exports = {
  fetchProducts,
  addNewProduct
};
