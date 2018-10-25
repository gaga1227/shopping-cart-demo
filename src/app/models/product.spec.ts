import { TestBed } from '@angular/core/testing';

import { Product } from './product';

describe('Product', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should populate assigned and default values when constructed', () => {
    const index = 0;
    const name = 'iPhone';
    const price = 100;
    const url = 'iphone.jpg';
    const product = new Product(index, name, price, url);

    // verify assigned values
    expect(product.index).toBe(index);
    expect(product.name).toBe(name);
    expect(product.price).toBe(price);
    expect(product.thumbUrl).toBe(url);

    // verify default values
    expect(product.displayPrice).toBe('$100');
    expect(product.addToCartTimestamp).toBe(-1);
  });

  it('should show message for display price  with invalid price', () => {
    let product;

    product = new Product(0, '', null, '');
    expect(product.displayPrice).toBe(Product.INVALID_PRICE_DISPLAY);

    product = new Product(0, '', undefined, '');
    expect(product.displayPrice).toBe(Product.INVALID_PRICE_DISPLAY);
  });
});
