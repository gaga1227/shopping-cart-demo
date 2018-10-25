export class Product {

  static readonly INVALID_PRICE_DISPLAY = 'Price unavailable';

  index: number; // original item index from the products data list
  name: string;
  price: number;
  thumbUrl: string;
  displayPrice: string;
  addToCartTimestamp = -1; // timestamp of being added to cart, default not added

  constructor(index: number, name: string, price: number, thumbUrl: string) {
    this.index = index;
    this.name = name;
    this.price = price;
    this.thumbUrl = thumbUrl;
    this.displayPrice = (isNaN(this.price) || this.price === null) ? Product.INVALID_PRICE_DISPLAY : `$${this.price}`;
  }
}
