import { ChangeDetectionStrategy, Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PinComponent } from '../pin-component/pin.component';

@Component({
    selector: 'app-confirm-pin',
    templateUrl: './confirm-pin.component.html',
    styleUrls: ['./confirm-pin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ConfirmPinComponent),
        multi: true
    }]
})

export class ConfirmPinComponent implements OnInit, ControlValueAccessor {

    @ViewChild('pinSet') pinSet: PinComponent;
    @ViewChild('pinConfirm') pinConfirm: PinComponent;

    private firstPin: string;

    constructor() { }

    ngOnInit(): void { }

    onPinEntered(pin: string): void {
        this.onTouched();
        this.firstPin = pin;
        this.pinConfirm.onFocusPin();
    }

    onPinConfirmed(pin: string): void {
        if (pin === this.firstPin) {
            this.setCurrentValue(pin);
        } else {
            this.pinSet.shakeOnError();
            this.pinSet.clearAll();
            this.pinConfirm.shakeOnError();
            this.pinConfirm.clearAll();
            this.pinSet.onFocusPin();
        }
    }
    writeValue(value: number): void { }

    registerOnChange(fn: any): void {
        this.setCurrentValue = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setCurrentValue(value: string) { }

    onTouched() { }
}