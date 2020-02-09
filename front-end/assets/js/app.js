const {
  checkValuesAndGenerateText,
  createElement,
  generateText
} = require('./util');
const { fetchProducts, addNewProduct } = require('./http');

const setEventListener = () => {
  // Initializes the app, registers the button click listener
  const addProductButton = document.querySelector('#btnAddProduct');
  addProductButton.addEventListener('click', addProduct);
};

const addProduct = () => {
  // Fetches the user input, creates a new HTML element based on it
  // and appends the element to the DOM
  const productNameInput = document.querySelector('input#name');
  const productQuantityInput = document.querySelector('input#quantity');

  const newProductText = checkValuesAndGenerateText(
    productNameInput.value,
    productQuantityInput.value
  );

  if (!newProductText) {
    return;
  }

  addNewProduct(productNameInput.value, productQuantityInput.value)
    .then(() => {
      const shoppingList = document.querySelector('.shopping-list');

      const newProduct = createElement('li', newProductText, 'shopping-item');

      shoppingList.appendChild(newProduct);

      productNameInput.value = '';
      productQuantityInput.value = '';
    })
    .catch(err => {
      console.log('Could not add product.');
      console.log(err);
    });
};

const displayProducts = products => {
  const shoppingList = document.querySelector('.shopping-list');

  products.forEach(p => {
    const newProductText = generateText(p.name, p.quantity);
    const newProduct = createElement('li', newProductText, 'shopping-item');

    shoppingList.appendChild(newProduct);
  });
};

const fetchAndDislayProducts = () => {
  fetchProducts()
    .then(response => {
      displayProducts(response.data);
    })
    .catch(err => {
      console.log('Could not fetch posts.');
      console.log(err);
    });
};

// Set initial event listener
setEventListener();
fetchAndDislayProducts();
