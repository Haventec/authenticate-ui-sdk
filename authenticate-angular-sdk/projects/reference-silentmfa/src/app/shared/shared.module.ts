import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideLogoComponent } from './side-logo/side-logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SideLogoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SideLogoComponent
  ],
})
export class SharedModule { }
