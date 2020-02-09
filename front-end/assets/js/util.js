const generateText = (name, quantity) => {
  // Returns output text
  return `Product: ${name}, Quantity: ${quantity}`;
};

const validateInput = (text, notEmpty, isNumber) => {
  // Validate user input with two pre-defined rules
  if (!text) {
    return false;
  }
  if (notEmpty && text.trim().length === 0) {
    return false;
  }
  if (isNumber && +text === NaN) {
    return false;
  }
  return true;
};

const createElement = (type, text, className) => {
  // Creates a new HTML element and returns it
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  newElement.textContent = text;
  return newElement;
};

const checkValuesAndGenerateText = (name, quantity) => {
  if (
    !validateInput(name, true, false) ||
    !validateInput(quantity, false, true)
  ) {
    return false;
  }
  return generateText(name, quantity);
};

module.exports = {
  createElement,
  checkValuesAndGenerateText,
  generateText,
  validateInput
};
