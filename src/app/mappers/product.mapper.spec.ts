import { TestBed } from '@angular/core/testing';

import { ProductMapper } from './product.mapper';
import { Product } from '../models/product';
import { getProductsResponse } from '../shared/fixtures/products-api.fixture';

describe('ProductMapper', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should filter out unpublished products and map into Products', () => {
    const products: Array<Product> = ProductMapper.transform(getProductsResponse);

    // verify list
    expect(products.length).toBe(1);

    // verify individual items
    verifyMappedItem(products[0]);
  });
});

// utils
function verifyMappedItem(item: Product) {
  expect(item.index).toBe(0);
  expect(item.name).toBe('Apple iPhone X');
  expect(item.price).toBe(299);
  expect(item.thumbUrl).toBe('https://www.image.com/1');
  expect(item.displayPrice).toBe('$299');
  expect(item.addToCartTimestamp).toBe(-1);
}
