import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';
import { IChangePin } from '../../interfaces/change-pin.interface';
import { AuthService } from '../../services/auth.service';
import { AuthenticateApiService } from '../../services/authenticate-api.service';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePinComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: AuthenticateApiService, private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  onSubmit(form: any): void {
    let change: IChangePin = {
      username: form.username
    }
    this.auth.setCurrentUser(change.username);
    this.api.forgotPin(change).subscribe(response => {
      if (response.responseStatus.status === "SUCCESS") {
        this.router.navigateByUrl(ROUTES.RESETPIN);
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
