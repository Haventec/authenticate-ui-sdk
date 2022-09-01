import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';
import { ILogin } from '../../interfaces/login-interface';
import { AuthService } from '../../services/auth.service';
import { AuthenticateApiService } from '../../services/authenticate-api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: AuthenticateApiService, private router: Router) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            username: ['', [Validators.required]],
            pin: ['', [Validators.required]]
        });
    }

    onLogin(form: any): void {
        let login: ILogin = {
            username: form.username,
            hashedPin: this.auth.getHashPin(form.pin)
        }
        this.api.login(login).subscribe(response => {
            this.auth.setCurrentUser(login.username);
            if (response.responseStatus.status === "SUCCESS") {
                this.auth.updateDataFromResponse(response);
                this.router.navigateByUrl(ROUTES.WELCOME);
            } else {
                if (response.responseStatus.message) {
                    window.alert(response.responseStatus.message);
                } else {
                    window.alert('There was a server error. Contact your administrator.');
                }
            }
        });
    }
}
