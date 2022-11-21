import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const ROUTES = {
    LOGIN: 'login',
    WELCOME: 'welcome'
}

const routes: Routes = [
    { path: ROUTES.LOGIN, component: LoginComponent },
    { path: ROUTES.WELCOME, component: WelcomeComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
