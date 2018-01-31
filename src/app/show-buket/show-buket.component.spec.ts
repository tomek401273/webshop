import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBuketComponent } from './show-buket.component';

describe('ShowBuketComponent', () => {
  let component: ShowBuketComponent;
  let fixture: ComponentFixture<ShowBuketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBuketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBuketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
