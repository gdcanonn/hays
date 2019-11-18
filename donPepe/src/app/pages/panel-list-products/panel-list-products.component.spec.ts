import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListProductsComponent } from './panel-list-products.component';

describe('PanelListProductsComponent', () => {
  let component: PanelListProductsComponent;
  let fixture: ComponentFixture<PanelListProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelListProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
