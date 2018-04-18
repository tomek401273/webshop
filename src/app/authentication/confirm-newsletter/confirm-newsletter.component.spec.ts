import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNewsletterComponent } from './confirm-newsletter.component';

describe('ConfirmNewsletterComponent', () => {
  let component: ConfirmNewsletterComponent;
  let fixture: ComponentFixture<ConfirmNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
