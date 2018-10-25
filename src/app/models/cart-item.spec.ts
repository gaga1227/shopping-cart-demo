import { TestBed } from '@angular/core/testing';

import { CartItem } from './cart-item';

describe('CartItem', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should populate assigned and default values when constructed', () => {
    const prodIndex = 0;
    const prodName = 'iPhone';
    const prodPrice = 100;
    const cartItem = new CartItem(prodIndex, prodName, prodPrice);

    // verify assigned values
    expect(cartItem.prodIndex).toBe(prodIndex);
    expect(cartItem.prodName).toBe(prodName);
    expect(cartItem.prodPrice).toBe(prodPrice);

    // verify default values
    expect(cartItem.quantity).toBe(1);
  });
});
