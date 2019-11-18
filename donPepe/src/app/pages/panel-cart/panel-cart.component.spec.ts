import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCartComponent } from './panel-cart.component';

describe('PanelCartComponent', () => {
  let component: PanelCartComponent;
  let fixture: ComponentFixture<PanelCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
