import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPinComponent } from './confirm-pin.component';

describe('ConfirmPinComponent', () => {
  let component: ConfirmPinComponent;
  let fixture: ComponentFixture<ConfirmPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
