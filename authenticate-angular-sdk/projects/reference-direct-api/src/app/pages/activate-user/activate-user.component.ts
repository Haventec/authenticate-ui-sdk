import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';
import { IActivateUser } from '../../interfaces/activate-user.interface';
import { AuthService } from '../../services/auth.service';
import { AuthenticateApiService } from '../../services/authenticate-api.service';

@Component({
    selector: 'app-activate-user',
    templateUrl: './activate-user.component.html',
    styleUrls: ['./activate-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivateUserComponent implements OnInit {

    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: AuthenticateApiService, private router: Router) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            activationToken: ['', [Validators.required]],
            pin: ['', [Validators.required]]
        });
    }

    onActivate(form: any): void {
        let activate: IActivateUser = {
            activationToken: form.activationToken,
            hashedPin: this.auth.getHashPin(form.pin)
        }
        this.api.activateUser(activate).subscribe(response => {
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
