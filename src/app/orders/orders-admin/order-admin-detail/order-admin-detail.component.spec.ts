import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdminDetailComponent } from './order-admin-detail.component';

describe('OrderAdminDetailComponent', () => {
  let component: OrderAdminDetailComponent;
  let fixture: ComponentFixture<OrderAdminDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAdminDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
