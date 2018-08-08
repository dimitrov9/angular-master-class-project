import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterXsMenuComponent } from './product-filter-xs-menu.component';

describe('ProductFilterXsMenuComponent', () => {
  let component: ProductFilterXsMenuComponent;
  let fixture: ComponentFixture<ProductFilterXsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilterXsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterXsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
