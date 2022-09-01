import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-enter-pin',
    templateUrl: './enter-pin.component.html',
    styleUrls: ['./enter-pin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EnterPinComponent),
        multi: true
    }]
})
export class EnterPinComponent implements OnInit, ControlValueAccessor {

    constructor() { }

    ngOnInit(): void { }

    onPinEntered(pin: string): void {
        this.onTouched();
        this.setCurrentValue(pin);
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
