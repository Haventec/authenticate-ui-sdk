import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';
import { IAddDevice } from '../../interfaces/add-device.interface';
import { AuthService } from '../../services/auth.service';
import { AuthenticateApiService } from '../../services/authenticate-api.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDeviceComponent implements OnInit {

    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: AuthenticateApiService, private router: Router) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            username: ['', [Validators.required]]
        });
    }

    onAddDevice(device: IAddDevice): void {
        this.auth.setCurrentUser(device.username);
        this.api.addDevice(device).subscribe(response => {
            if (response.responseStatus.status === "SUCCESS") {
                this.auth.updateDataFromResponse(response);
                this.router.navigate([ROUTES.ACTIVATEDEVICE]);
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
