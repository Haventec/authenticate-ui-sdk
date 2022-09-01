import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appLimitInputNumberLength]'
})

/**
 * Limits length of digits entered to an input field with type='number'
 * Use type='text' on your <input> to allow padding with zeros - alpha characters are
 * Be sure to use inputmode='tel | text' to get the correct soft keyboard
 */

export class LimitInputNumberLengthDirective implements OnInit, OnDestroy {

  private readonly ALLOWABLE_MAX_DIGITS = 20;
  private unsubscribe = new Subject<void>();

  /**
   * Must specify a value when input type='number' otherwise maximum digit length defaults to this value
   * Can be omitted when input type='string' where maxLength attribute is defined on the field
   */
  @Input() maxDigits: number = this.ALLOWABLE_MAX_DIGITS;
  /**
   * Required to use reactive form
   */
  @Input() inputControl: UntypedFormControl;

  constructor() { }

  ngOnInit() {
    if (!this.inputControl) {
      return;
    }
    /**
     * Form control value is read and rules applied
     * The form control value is updated
     */
    this.inputControl.valueChanges.pipe(takeUntil(this.unsubscribe), distinctUntilChanged()).subscribe((num: string | number) => {

      if (num === null || num === "") return;
      if (typeof num !== 'string' && typeof num !== 'number') return;

      let value = num.toString();

      if (typeof num === 'string') {
        value = value.replace(/\D/g, '');
      }

      if (value.length > this.maxDigits) {
        value = value.slice(0, this.maxDigits);
      }

      this.inputControl.setValue(value, {emitEvent: false});
    });
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
