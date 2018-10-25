import { TestBed } from '@angular/core/testing';

import { CartItemMapper } from './cart-item.mapper';
import { CartItem } from '../models/cart-item';
import { getProducts } from '../shared/fixtures/products.fixture';

describe('CartItemMapper', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should filter out not added-to-cart products', () => {
    const cartItems: Array<CartItem> = CartItemMapper.transform(getProducts);

    // verify list
    expect(cartItems.length).toBeLessThan(getProducts.length);
    expect(cartItems.length).toBe(2);

    // verify individual items
    const filteredOutItemName = 'Google Pixel 2';
    expect(cartItems[0].prodName === filteredOutItemName).toBe(false);
    expect(cartItems[1].prodName === filteredOutItemName).toBe(false);
  });

  it('should sort by added-to-cart time and map into cart items', () => {
    const cartItems: Array<CartItem> = CartItemMapper.transform(getProducts);

    // verify first item
    expect(cartItems[0].prodIndex).toBe(2);
    expect(cartItems[0].prodName).toBe('Nokia S7');
    expect(cartItems[0].prodPrice).toBe(399);
    expect(cartItems[0].quantity).toBe(1);

    // verify second item
    expect(cartItems[1].prodIndex).toBe(0);
    expect(cartItems[1].prodName).toBe('iPhone X');
    expect(cartItems[1].prodPrice).toBe(199);
    expect(cartItems[1].quantity).toBe(1);
  });
});
