import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HelpComponent } from './helppage/help.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { ActivateDeviceComponent } from './activate-device/activate-device.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { ResetPinComponent } from './reset-pin/reset-pin.component';

@NgModule({
  declarations: [AddUserComponent, ActivateUserComponent, WelcomeComponent, HelpComponent, LandingPageComponent, LoginComponent, ActivateDeviceComponent, AddDeviceComponent, ChangePinComponent, ResetPinComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
