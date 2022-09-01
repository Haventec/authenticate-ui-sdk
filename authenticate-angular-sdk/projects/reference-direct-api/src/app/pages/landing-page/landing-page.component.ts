import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {

    }
    onLogin(): void {
        this.router.navigateByUrl(ROUTES.LOGIN);
    }
    onAddUser(): void {
        this.router.navigateByUrl(ROUTES.ADDUSER);
    }
    onAddDevice(): void {
        this.router.navigateByUrl(ROUTES.ADDDEVICE);
    }
    onResetPin(): void {
        this.router.navigateByUrl(ROUTES.CHANGEPIN);
    }
}
