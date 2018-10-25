import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductsApiService } from './services/products-api.service';

import { getProductsResponse } from './shared/fixtures/products-api.fixture';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;
  let req: TestRequest;

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let productsApiService: ProductsApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        ProductsApiService,
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA] // not to error on unknown elements and attributes
    }).compileComponents();
  }));

  beforeEach(() => {
    productsApiService = TestBed.get(ProductsApiService);
    httpMock = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // verify initial component states
    _verifyInitialStates();

    // verify initial product load request and return mock data
    req = httpMock.expectOne(productsApiService.GET_PRODUCTS_ENDPOINT);
    req.flush(getProductsResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load remote products and update component states', () => {
    _verifyCustomStates(true, false, 1, 'loading products complete');
  });

  it('should onCartItemChange() update component states and target product state', () => {
    // initial state, not added to cart
    const targetProduct = component.availableProducts[0];
    expect(targetProduct.addToCartTimestamp).toBe(-1);

    // adding to cart
    component.onCartItemChange(0, true);
    expect(targetProduct.addToCartTimestamp).toBeGreaterThan(-1);
    expect(component.announcementContent).toBe('product item: Apple iPhone X is added to shopping cart');

    // removing from cart
    component.onCartItemChange(0, false);
    expect(targetProduct.addToCartTimestamp).toBe(-1);
    expect(component.announcementContent).toBe('product item: Apple iPhone X is removed from shopping cart');
  });

  it('should onCartItemChange() NOT update with invalid product index', () => {
    const targetProduct = component.availableProducts[0];
    expect(targetProduct.addToCartTimestamp).toBe(-1);

    component.onCartItemChange(2, true);
    expect(targetProduct.addToCartTimestamp).toBe(-1);
  });

  // utils
  function _verifyCustomStates(isLoaded: boolean, isLoadError: boolean, productsLength: number, announcement: string) {
    expect(component.isRemoteProductsLoaded).toBe(isLoaded);
    expect(component.isRemoteProductsLoadError).toBe(isLoadError);
    expect(component.availableProducts.length).toBe(productsLength);
    expect(component.announcementContent).toBe(announcement);
  }

  function _verifyInitialStates() {
    _verifyCustomStates(false, false, 0, 'loading products in progress');
  }
});
