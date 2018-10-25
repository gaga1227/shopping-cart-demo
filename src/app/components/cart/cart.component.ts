import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { CartItemMapper } from '../../mappers/cart-item.mapper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Output() removeFromCartClick: EventEmitter<number> = new EventEmitter();

  private _products: Array<Product> = []; // private var to hold the product list reference
  cartItems: Array<CartItem> = [];

  constructor() {
  }

  /**
   * products - setter method for products
   *
   * @param {Array<Product>} products
   */
  @Input()
  set products(products: Array<Product>) {
    this._products = products;

    // update cart items each time when products list changes from parent
    this.cartItems = CartItemMapper.transform(this._products);
  }

  /**
   * products - getter method for products
   *
   * @return {Array<Product>}
   */
  get products() {
    return this._products;
  }

  /**
   * onRemoveFromCartClick - handler for remove from cart button click
   *
   * @param {number} prodIndex
   * @return {void}
   */
  onRemoveFromCartClick(prodIndex: number) {
    this.removeFromCartClick.emit(prodIndex);
  }
}
