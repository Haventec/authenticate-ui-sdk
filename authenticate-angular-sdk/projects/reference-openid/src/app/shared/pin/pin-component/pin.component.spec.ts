import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick, waitForAsync,
} from '@angular/core/testing';

import { PinComponent } from './pin.component';
import { By } from '@angular/platform-browser';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('PinComponent', () => {
  let component: PinComponent;
  let fixture: ComponentFixture<PinComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule],
      declarations: [PinComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should focus on pin input field', fakeAsync(() => {
    let codeField = fixture.debugElement.query(By.css('#hidden-input:focus'))
      .nativeElement;
    expect(codeField).toBeTruthy();
  }));

  it('onInit() should setup pinIndexes according to digitSpan', () => {
    // use default digitSpan of 4
    component.ngOnInit();
    expect(component.pinIndexes).toEqual([0, 1, 2, 3]);
    component.digitSpan = 5;
    component.ngOnInit();
    expect(component.pinIndexes).toEqual([0, 1, 2, 3, 4]);
  });

  it('should create a FormGroup comprised of pinField FormControl', () => {
    component.ngOnInit();
    expect(component.pinFormGroup instanceof UntypedFormGroup).toBe(true);
    expect(component.pinFormGroup.get('pinField') instanceof UntypedFormControl).toBe(
      true
    );
  });

  it('on pin change currentPin should refect pin input', fakeAsync(() => {
    component.ngOnInit();
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("1234");
    pinFieldControl.updateValueAndValidity({ emitEvent: true });
    expect(component.currentPin).toEqual("1234");
    flush();
  }));

  it('should not submit when field contains alpha char', fakeAsync(() => {
    spyOn(component.onPinSet, 'emit');
    component.ngOnInit();
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("123a");
    pinFieldControl.updateValueAndValidity({ emitEvent: true });
    tick(300);
    expect(component.onPinSet.emit).toHaveBeenCalledTimes(0);
    flush();
  }));

  it('on pin change form validation status should reflect digitSpan', fakeAsync(() => {
    spyOn(component, 'clearAll');
    spyOn(component.onPinSet, 'emit');
    component.ngOnInit();
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("123");
    pinFieldControl.updateValueAndValidity({ emitEvent: true });
    expect(component.pinFormGroup.valid).toBeFalse();
    pinFieldControl.setValue("0000");
    pinFieldControl.updateValueAndValidity({ emitEvent: true });
    expect(component.pinFormGroup.valid).toBeTrue();
    flush();
  }));

  it('entry of nth == digitSpan should submit the form and disallow updates to currentPin', () => {
    let submitSpy = spyOn<any>(component, 'submit');
    spyOn(component.onPinSet, 'emit');
    component.ngOnInit();
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("1234");
    expect(submitSpy).toHaveBeenCalled();
    pinFieldControl.setValue("1");
    expect(component.currentPin).toBe("1234");
  });

  it('entry of nth == digitSpan should emit the correct pin', fakeAsync(() => {
    spyOn(component.onPinSet, 'emit');
    component.ngOnInit();
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("123");
    pinFieldControl.updateValueAndValidity({ emitEvent: true });
    tick(300);
    expect(component.onPinSet.emit).toHaveBeenCalledTimes(0);
    pinFieldControl.setValue("1234");
    pinFieldControl.updateValueAndValidity({ emitEvent: true });
    tick(300);
    expect(component.onPinSet.emit).toHaveBeenCalledWith("1234");
    flush();
  }));

  it('clearAll() should reset pinField and state', () => {
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("1234");
    component.clearAll();
    expect(pinFieldControl.value).toBe('');
    expect(pinFieldControl.pristine).toBeTrue;
    expect(pinFieldControl.untouched).toBeTrue;
    expect(pinFieldControl.valid).toBeFalse;
  });

  it('clearAll() should allow otherwise locked pin update', () => {
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("1234");
    expect(component.currentPin).toBe("1234");
    pinFieldControl.setValue("1");
    expect(component.currentPin).toBe("1234");
    component.clearAll();
    pinFieldControl.setValue("1");
    expect(component.currentPin).toBe("1");
  });

  it('should shake on pin error', fakeAsync(() => {
    let codeField = fixture.debugElement.query(By.css('.error-shake'));
    expect(codeField).toBeFalsy();
    component.shakeOnError();
    fixture.detectChanges();
    flush();
    codeField = fixture.debugElement.query(By.css('.error-shake'));
    expect(codeField).toBeTruthy();
    const pinFieldControl = component.pinFormGroup.get('pinField');
    pinFieldControl.setValue("1234");
    fixture.detectChanges();
    flush();
    codeField = fixture.debugElement.query(By.css('.error-shake'));
    expect(codeField).toBeFalsy();
  }));
});
