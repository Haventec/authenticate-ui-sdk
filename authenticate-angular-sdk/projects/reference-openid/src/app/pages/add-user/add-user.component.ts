import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';
import { IAddUser } from '../../interfaces/add-user.interface';
import { AuthService } from '../../services/auth.service';
import { AuthenticateApiService } from '../../services/authenticate-api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: AuthenticateApiService, private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSignUp(user: IAddUser): void {
    this.auth.setCurrentUser(user.username);
    this.api.addUser(user).subscribe(response => {
      if (response.responseStatus.status === "SUCCESS") {
        this.auth.updateDataFromResponse(response);
        this.router.navigate([ROUTES.ACTIVATEUSER]);
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
