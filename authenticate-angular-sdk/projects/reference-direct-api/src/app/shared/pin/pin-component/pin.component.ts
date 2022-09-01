import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-pin',
    templateUrl: './pin.component.html',
    styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('pin') pin: ElementRef<HTMLInputElement>;

    @Input() disableLoginScreenWhenWebAuthnActive: boolean;

    @Input() digitSpan: number = 4;

    @Output() onPinSet: EventEmitter<string> = new EventEmitter();

    private subscribeWhile: boolean;
    private unsubscribe = new Subject<void>();

    pinFormGroup: UntypedFormGroup;
    pinFieldControl: FormControl;
    pinIndexes: Array<number>;
    currentPin: string = "";
    errorShake = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.pinIndexes = Array(this.digitSpan)
            .fill(0)
            .map((x, i) => i);

        this.pinFormGroup = this.formBuilder.group({
            pinField: [{ value: '', disabled: this.disableLoginScreenWhenWebAuthnActive },
            [
                Validators.required,
                Validators.pattern(`[0-9]{${this.digitSpan},${this.digitSpan}}`)
            ]]
        });
        this.pinFieldControl = this.pinFormGroup.get('pinField') as FormControl;
        this.pinFieldControl.valueChanges
            .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe), filter(() => this.subscribeWhile === true))
            .subscribe((pin) => {
                this.currentPin = pin.replace(/\D/g, '');
                if (this.currentPin.length === this.pinIndexes.length) {
                    this.subscribeWhile = false;
                    this.errorShake = false;
                    this.submit();
                }
            });
        this.subscribeWhile = true;
    }
    public clearAll(): void {
        this.subscribeWhile = true;
        this.pinFieldControl.reset('');
        this.currentPin = "";
    }

    public shakeOnError() {
        this.errorShake = true;
    }
    public onFocusPin(): void {
        this.pin.nativeElement.focus();
        this.clearAll();
    }
    private submit(): void {
        setTimeout(() => {
            this.onPinSet.emit(this.currentPin);
        }, 300);
    }
    ngOnChanges(changes: SimpleChanges) {
        if (this.pinFormGroup && !this.disableLoginScreenWhenWebAuthnActive) {
            this.pinFormGroup.controls['pinField'].enable();
        }
    }
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
