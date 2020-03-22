const axios = require('axios');
const config = require('./config');

const fetchProducts = () => {
  return axios.get(`${config.apiUrl}/products`);
};

const addNewProduct = (name, quantity) => {
  return axios.post(`${config.apiUrl}/products`, { name, quantity });
};

module.exports = {
  fetchProducts,
  addNewProduct,
};
