import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import Spy = jasmine.Spy;

import { CartComponent } from './cart.component';
import { getProducts } from '../../shared/fixtures/products.fixture';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let spyRemoveFromCartClick: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should products setter/getter set/get value to private member', () => {
    expect(component.products.length).toBe(0);
    component.products = getProducts;
    expect(component.products).toBe(getProducts);
  });

  it('should products setter also update cartItems', () => {
    expect(component.cartItems.length).toBe(0);
    component.products = getProducts;
    expect(component.cartItems.length).toBe(2);
  });

  it('should onRemoveFromCartClick fire removeFromCartClick event', () => {
    spyRemoveFromCartClick = spyOn(component.removeFromCartClick, 'emit').and.callThrough();

    const expectedIndex = 0;
    component.onRemoveFromCartClick(expectedIndex);

    expect(spyRemoveFromCartClick).toHaveBeenCalledTimes(1);
    expect(spyRemoveFromCartClick).toHaveBeenCalledWith(expectedIndex);
  });
});
