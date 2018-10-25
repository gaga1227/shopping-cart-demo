import { $, $$, browser, by, element, Locator } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  isElementPresent(locator: Locator) {
    return element(locator).isPresent();
  }

  isElementDisplayed(locator: Locator) {
    return element(locator).isDisplayed();
  }

  findProductItems() {
    return $$('.app__product-display .app__product-display-item');
  }

  findShoppingCartItems() {
    return $$('.app__cart .app__cart-item');
  }

  findAddToCartCTA(productIndex: number) {
    return $(`.app__product-display-item[data-index="${productIndex}"] button`);
  }

  findCartItemRemoveCTA(itemIndex: number) {
    return $(`.app__cart-item[data-product-index="${itemIndex}"] button`);
  }
}
