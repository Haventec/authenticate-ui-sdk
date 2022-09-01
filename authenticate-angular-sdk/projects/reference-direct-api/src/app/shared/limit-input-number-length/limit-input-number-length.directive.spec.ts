import { UntypedFormControl } from '@angular/forms';
import { LimitInputNumberLengthDirective } from './limit-input-number-length.directive';

describe('LimitInputNumberLengthDirective', () => {

  let directive: LimitInputNumberLengthDirective;

  beforeEach(() => {
    directive = new LimitInputNumberLengthDirective();
  });

  afterEach(() => {
    directive.ngOnDestroy();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should prevent alphabetical characters', () => {
    directive.inputControl = new UntypedFormControl('test');
    directive.ngOnInit();
    directive.inputControl.setValue("01ab2c");
    expect(directive.inputControl.value).toBe("012");
  });

  it('should limit the length of number input', () => {
    directive.inputControl = new UntypedFormControl('test');
    directive.maxDigits = 4;
    directive.ngOnInit();
    directive.inputControl.setValue(12345);
    expect(directive.inputControl.value).toBe("1234");
  });
});
