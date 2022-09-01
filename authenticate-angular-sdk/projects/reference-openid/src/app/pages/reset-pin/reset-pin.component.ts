import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResetPin } from '../../interfaces/reset-pin.interface';
import { AuthService } from '../../services/auth.service';
import { AuthenticateApiService } from '../../services/authenticate-api.service';
import { BrowserWindowService } from '../../services/browser-window.service';
import { OidcParametersService } from '../../services/oidc-parameters.service';

@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.component.html',
  styleUrls: ['./reset-pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPinComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    private api: AuthenticateApiService, private oidcParamService: OidcParametersService,
    private browserWindowService: BrowserWindowService) { }

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
        const uri = this.oidcParamService.createRedirectUri(response.accessToken.token, this.oidcParamService.getOpenIDParams());
        this.browserWindowService.loadWindow(uri, '_self');
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
