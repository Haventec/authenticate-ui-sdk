import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateDeviceComponent } from './pages/activate-device/activate-device.component';
import { ActivateUserComponent } from './pages/activate-user/activate-user.component';
import { AddDeviceComponent } from './pages/add-device/add-device.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ChangePinComponent } from './pages/change-pin/change-pin.component';
import { HelpComponent } from './pages/helppage/help.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPinComponent } from './pages/reset-pin/reset-pin.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const ROUTES = {
    LANDING: 'landing',
    LOGIN: 'login',
    ADDUSER: 'add-user',
    ADDDEVICE: 'add-device',
    ACTIVATEUSER: 'activate-user',
    ACTIVATEDEVICE: 'activate-device',
    CHANGEPIN: 'change-pin',
    RESETPIN: 'reset-pin',
    WELCOME: 'welcome',
    HELP: 'help'
}

const routes: Routes = [
    { path: ROUTES.LANDING, component: LandingPageComponent },
    { path: ROUTES.LOGIN, component: LoginComponent },
    { path: ROUTES.ADDUSER, component: AddUserComponent },
    { path: ROUTES.ADDDEVICE, component: AddDeviceComponent },
    { path: ROUTES.ACTIVATEUSER, component: ActivateUserComponent },
    { path: ROUTES.ACTIVATEDEVICE, component: ActivateDeviceComponent },
    { path: ROUTES.CHANGEPIN, component: ChangePinComponent },
    { path: ROUTES.RESETPIN, component: ResetPinComponent },
    { path: ROUTES.WELCOME, component: WelcomeComponent },
    { path: ROUTES.HELP, component: HelpComponent },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
