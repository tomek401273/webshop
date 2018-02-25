import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketUserComponent } from './bucket-user.component';

describe('BucketUserComponent', () => {
  let component: BucketUserComponent;
  let fixture: ComponentFixture<BucketUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
