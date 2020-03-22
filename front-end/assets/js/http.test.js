const axios = require('axios');
const config = require('./config');
const { fetchProducts, addNewProduct } = require('./http');

jest.mock('axios');

const productsUrl = `${config.apiUrl}/products`;
const products = [
  { id: 1, name: 'Product 1', quantity: '3' },
  { id: 2, name: 'Product 2', quantity: '2' },
];

test('should return product data', async () => {
  axios.get.mockResolvedValueOnce({
    data: products,
  });
  const result = await fetchProducts();

  expect(axios.get).toHaveBeenCalledWith(productsUrl);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(result.data).toEqual(products);
});

test('should add new product', async () => {
  const successMsg = 'http://localhost:3000/products';
  const productName = 'Product 3';
  const quantity = '5';
  axios.post.mockResolvedValueOnce({ message: successMsg });

  const result = await addNewProduct(productName, quantity);

  expect(axios.post).toHaveBeenCalledWith(productsUrl, {
    name: productName,
    quantity,
  });
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(result.message).toEqual(successMsg);
});
