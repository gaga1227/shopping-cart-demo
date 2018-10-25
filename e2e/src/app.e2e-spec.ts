import { AppPage } from './app.po';
import { by } from 'protractor';

describe('Shopping Cart Demo', () => {
  let app: AppPage;

  beforeEach(async () => {
    app = new AppPage();
    await app.navigateTo();
  });

  it('should display a range of products and an empty shopping cart', () => {
    // app container
    expect(app.isElementDisplayed(by.css('.app'))).toBe(true);

    // products section
    expect(app.isElementDisplayed(by.css('.app__product-display'))).toBe(true);
    expect(app.findProductItems().count()).toBe(5);

    // shopping cart
    expect(app.isElementDisplayed(by.css('.app__cart'))).toBe(true);
    expect(app.findShoppingCartItems().count()).toBe(0);
  });

  it('should \'Add to cart\' and \'Remove\' buttons add/remove a product', () => {
    expect(app.isElementDisplayed(by.css('.app__product-display'))).toBe(true);
    expect(app.isElementDisplayed(by.css('.app__cart'))).toBe(true);

    // add one product
    app.findAddToCartCTA(0).click();
    expect(app.findShoppingCartItems().count()).toBe(1);

    // add another product
    app.findAddToCartCTA(1).click();
    expect(app.findShoppingCartItems().count()).toBe(2);

    // remove one product
    app.findCartItemRemoveCTA(0).click();
    expect(app.findShoppingCartItems().count()).toBe(1);
  });
});
