import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
    isEmailing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: AuthenticateApiService, private router: Router) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onLogin(form: any): void {
        let login: ILogin = {
            username: form.username,
            password: form.password
        }
        this.isEmailing$.next(true);
        this.api.login(login).subscribe(response => {
            this.isEmailing$.next(false);
            this.auth.setCurrentUser(login.username);
            this.auth.updateDataFromResponse(response.accessToken);
            this.router.navigateByUrl(ROUTES.WELCOME);
        });
    }
}
