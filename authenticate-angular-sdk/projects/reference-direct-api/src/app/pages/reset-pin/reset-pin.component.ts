import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';
import { IResetPin } from '../../interfaces/reset-pin.interface';
import { AuthService } from '../../services/auth.service';
import { AuthenticateApiService } from '../../services/authenticate-api.service';

@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.component.html',
  styleUrls: ['./reset-pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPinComponent implements OnInit {

    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: AuthenticateApiService, private router: Router) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            resetPinToken: ['', [Validators.required]],
            pin: ['', [Validators.required]],
        });
    }

    onResetPin(form: any): void {

        let activate: IResetPin = {
            resetPinToken: form.resetPinToken,
            hashedPin: this.auth.getHashPin(form.pin)
        }
        this.api.resetPin(activate).subscribe(response => {
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
