import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

    username: string;

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
        this.username = this.auth.getUsername();
    }
}
