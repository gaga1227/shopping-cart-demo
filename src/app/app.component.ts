import { Component, OnInit, Output } from '@angular/core';
import { ProductsApiService } from './services/products-api.service';
import { Product } from './models/product';
import { ProductMapper } from './mappers/product.mapper';

@Component({
  selector: 'app-shopping-cart-demo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  // remote products loading states
  @Output() isRemoteProductsLoaded = false;
  @Output() isRemoteProductsLoadError = false;

  // products array from mapped from remote API data
  @Output() availableProducts: Array<Product> = [];

  // for accessibility live announcements
  announcementContent = '';

  constructor(private productsApi: ProductsApiService) {
  }

  ngOnInit() {
    this._loadRemoteProducts();
  }

  /**
   * onCartItemChange - event handler for cart item add/remove events
   *
   * @param {number} productIndex
   * @param {boolean} isAdding
   * @return {void}
   */
  onCartItemChange(productIndex: number, isAdding) {
    if (isNaN(productIndex) || !this.availableProducts[productIndex]) {
      console.warn('[SCD]', 'Invalid product index number', productIndex);
      return;
    }

    // assign timestamp to help determine added-to-cart status
    this.availableProducts[productIndex].addToCartTimestamp = isAdding ? (new Date()).getTime() : -1;

    // shallow copy to trigger setter on child component
    this.availableProducts = [...this.availableProducts];

    // announce interaction for screen reader
    const productName = this.availableProducts[productIndex].name;
    this._makeAnnouncement(`product item: ${productName} is ${isAdding ? 'added to' : 'removed from'} shopping cart`);

    console.log('[SCD]', 'Product change in cart: ', productIndex, isAdding ? 'Added' : 'Removed');
  }

  /**
   * _loadRemoteProducts - load remote products from API service
   *
   * @private
   * @return {void}
   */
  private _loadRemoteProducts() {
    this._makeAnnouncement('loading products in progress');
    this.productsApi.getProducts()
      .subscribe(
        (data: any[]) => {
          this.isRemoteProductsLoadError = false;
          this.availableProducts = ProductMapper.transform(data);

          const productsCount = this.availableProducts.length;
          this._makeAnnouncement(`${productsCount} product${productsCount > 1 ? 's' : ''} loaded and displayed`);

          console.log('[SCD]', 'Products loaded:', this.availableProducts);
        },
        errorResponse => {
          this.isRemoteProductsLoadError = true;
          this._makeAnnouncement('error loading products');

          console.warn('[SCD]', 'Error getting remote products', errorResponse);
        },
        () => {
          this.isRemoteProductsLoaded = true;
          this._makeAnnouncement('loading products complete');

          console.log('[SCD]', 'Products subscription complete');
        });
  }

  /**
   * _makeAnnouncement - method to update aria-live property value
   *
   * @param {string} text
   * @private
   * @return {void}
   */
  private _makeAnnouncement(text = '') {
    this.announcementContent = text;
  }
}
