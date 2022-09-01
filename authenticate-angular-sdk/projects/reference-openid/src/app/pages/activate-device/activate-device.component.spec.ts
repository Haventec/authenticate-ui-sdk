import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDeviceComponent } from './activate-device.component';

describe('ActivateDeviceComponent', () => {
  let component: ActivateDeviceComponent;
  let fixture: ComponentFixture<ActivateDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
