import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import Spy = jasmine.Spy;

import { ProductDisplayComponent } from './product-display.component';

describe('ProductDisplayComponent', () => {
  let component: ProductDisplayComponent;
  let fixture: ComponentFixture<ProductDisplayComponent>;

  let spyAddToCartClick: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDisplayComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should onAddToCart fire addToCartClick event', () => {
    spyAddToCartClick = spyOn(component.addToCartClick, 'emit').and.callThrough();

    const expectedIndex = 0;
    component.onAddToCart(expectedIndex);

    expect(spyAddToCartClick).toHaveBeenCalledTimes(1);
    expect(spyAddToCartClick).toHaveBeenCalledWith(expectedIndex);
  });
});
