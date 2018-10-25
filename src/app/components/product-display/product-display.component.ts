import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent {

  @Input() products: Array<Product> = [];
  @Input() isProductsLoadComplete = false;
  @Input() isProductsLoadError = false;

  @Output() addToCartClick: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  /**
   * onAddToCart - handler for click event on product 'Add to cart' CTA
   *
   * @returns {void}
   */
  onAddToCart(productIndex: number) {
    this.addToCartClick.emit(productIndex);
  }
}
