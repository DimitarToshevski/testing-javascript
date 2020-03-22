const puppeteer = require('puppeteer');
const config = require('./config');
const { generateText, checkValuesAndGenerateText } = require('./util');

// UNIT TEST
test('should output product and quantity', () => {
  const text = generateText('Eggs', 4);
  expect(text).toBe('Product: Eggs, Quantity: 4');

  /*
    Same assertion using snapshot
    expect(text).toMatchInlineSnapshot(`"Product: Eggs, Quantity: 4"`);
  */
});

// INTEGRATION TEST
test('should generate a valid text output', () => {
  const text = checkValuesAndGenerateText('Milk', 5);
  expect(text).toBe('Product: Milk, Quantity: 5');

  /*
    Same assertion using snapshot
    expect(text).toMatchInlineSnapshot(`"Product: Milk, Quantity: 5"`);
  */
});

// END-TO-END TEST
test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.goto(config.siteUrl);
  await page.click('input#name');
  await page.type('input#name', 'Apple');
  await page.click('input#quantity');
  await page.type('input#quantity', '1');
  await page.click('#btnAddProduct');
  const finalText = await page.$eval(
    '.shopping-item:last-of-type',
    el => el.textContent,
  );
  expect(finalText).toBe('Product: Apple, Quantity: 1');

  /*
    Same assertion using snapshot
    expect(finalText).toMatchInlineSnapshot(`"Product: Apple, Quantity: 1"`);
  */
}, 10000);

// HOMEWORK - Test the Validate Input Function
