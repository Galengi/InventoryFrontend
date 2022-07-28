import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopCardComponent } from './product-shop-card.component';

describe('ProductShopCardComponent', () => {
  let component: ProductShopCardComponent;
  let fixture: ComponentFixture<ProductShopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShopCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
