const { generateText, checkValuesAndGenerateText } = require('./util');
const puppeteer = require('puppeteer');
const config = require('./config');

test('should output product & quantity if quantity is a number', () => {
  // AAA
  // Arrange
  // Act
  // Assert
  let text;
  text = generateText('Eggs', 4)

  expect(text).toBe('Product: Eggs, Quantity: 4')
  /*
    Same assertion using snapshot
    expect(text).toMatchInlineSnapshot(`"Product: Eggs, Quantity: 4"`);
  */
})

// the test finds a case which requires a change in the code to validate the input
// once the logic in the code is changed this test should no longer be valid - it should not pass with a value of null
// after the change in the code is made, this test should expect it to fail if quantity is null.
test('should output product & quantity if quantity is null', () => {
  // AAA
  // Arrange
  // Act
  // Assert
  let text;
  text = generateText('Eggs', null)

  expect(text).toBe('Product: Eggs, Quantity: null')
})

// INTEGRATION TEST

test('should generate text if the input is valid', () => {
  const text = checkValuesAndGenerateText('Eggs', 4)

  expect(text).toBe('Product: Eggs, Quantity: 4')
  /*
    Same assertion using snapshot
    expect(text).toMatchInlineSnapshot(`"Product: Eggs, Quantity: 4"`);
  */
})

test('should not generate text if the inputted quantity is not a number', () => {
  const text = checkValuesAndGenerateText('Eggs', 'a')

  expect(text).toBe(false)
})

test('should not generate text if the input is empty', () => {
  const text = checkValuesAndGenerateText('', 'a')

  expect(text).toBe(false)
})


// E2E - End-to-End

test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();

  await page.goto(config.siteUrl);
  await page.click('input#name');
  await page.type('input#name', 'Apple');
  await page.click('input#quantity');
  await page.type('input#quantity', '3');
  await page.click('#btnAddProduct');

  const finalText = await page.$eval('.shopping-item:last-of-type', el => el.textContent);

  expect(finalText).toBe('Product: Apple, Quantity: 3')
  /*
  Same assertion using snapshot
  expect(finalText).toMatchInlineSnapshot(`"Product: Apple, Quantity: 3"`);
*/
}, 10000)