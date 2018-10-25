import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

export class CartItemMapper {

  /**
   * transform - map list of Products to list of Cart items
   *
   * @returns {Array<CartItem>}
   */
  static transform(products: Array<Product>) {
    const addedToCartProducts = products
      // only added to cart products are required
      .filter(({addToCartTimestamp}) => addToCartTimestamp > 0)
      // sort cart items so they are displayed in added-to-cart time sequence
      .sort((a, b) => a.addToCartTimestamp - b.addToCartTimestamp);

    const listLength = addedToCartProducts.length;
    const cartItems: Array<CartItem> = [];

    for (let i = 0; i < listLength; i++) {
      const {index, name, price} = addedToCartProducts[i];
      cartItems.push(new CartItem(index, name, price));
    }

    return cartItems;
  }
}
