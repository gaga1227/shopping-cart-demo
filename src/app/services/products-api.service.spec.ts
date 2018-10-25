import { async, inject, TestBed } from '@angular/core/testing';

import { ProductsApiService } from './products-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { getProductsResponse } from '../shared/fixtures/products-api.fixture';

describe('ProductsAPIService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsApiService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should return products data when call getProducts()', async(inject(
    [HttpTestingController, ProductsApiService],
    (httpMock: HttpTestingController, productsAPIService: ProductsApiService) => {

      // call service method
      productsAPIService.getProducts().subscribe(data => {
        // verify partial mocked data
        expect(data.length).toBe(2);
        expect(data[0].isPublished).toBe(getProductsResponse[0].isPublished);
        expect(data[0].productName).toBe(getProductsResponse[0].productName);
        expect(data[1].productImage).toBe(getProductsResponse[1].productImage);
        expect(data[1].price).toBe(getProductsResponse[1].price);
      });

      // assert request
      const req = httpMock.expectOne(productsAPIService.GET_PRODUCTS_ENDPOINT);
      expect(req.request.method).toEqual('GET');

      // return mock data
      req.flush(getProductsResponse);
    })));
});
