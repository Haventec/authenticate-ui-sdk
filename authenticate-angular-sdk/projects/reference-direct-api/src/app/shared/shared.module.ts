import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideLogoComponent } from './side-logo/side-logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LimitInputNumberLengthDirective } from './limit-input-number-length/limit-input-number-length.directive';
import { EnterPinComponent } from './pin/enter-pin/enter-pin.component';
import { ConfirmPinComponent } from './pin/confirm-pin/confirm-pin.component';
import { PinComponent } from './pin/pin-component/pin.component';

@NgModule({
  declarations: [
    SideLogoComponent, PinComponent, LimitInputNumberLengthDirective, EnterPinComponent, ConfirmPinComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SideLogoComponent, PinComponent, EnterPinComponent, ConfirmPinComponent, LimitInputNumberLengthDirective
  ],
})
export class SharedModule { }
