import { Product } from '../models/product';

export class ProductMapper {

  /**
   * transform - map product response data object list to list of Product
   *
   * @returns {Array<Product>}
   */
  static transform(data: any[]) {
    // only published products are required
    const filteredData = data.filter(({isPublished}) => isPublished === 'true');

    const dataLength = filteredData.length;
    const products: Array<Product> = [];

    for (let i = 0; i < dataLength; i++) {
      const {productName, productImage, price} = filteredData[i];
      products.push(new Product(i, productName, parseFloat(price), productImage));
    }

    return products;
  }
}
