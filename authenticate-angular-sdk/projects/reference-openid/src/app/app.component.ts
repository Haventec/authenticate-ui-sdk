import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from './app-routing.module';
import { APPLICATION_UUID } from './constants/application.constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'reference-direct-api';
    constructor(router: Router) {
        if (!APPLICATION_UUID || APPLICATION_UUID === '' || APPLICATION_UUID === 'PLEASE PROVIDE YOUR APPLICATION UUID') {
            router.navigateByUrl(ROUTES.HELP);
        }
    }
}
