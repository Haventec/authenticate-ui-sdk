import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '../../app-routing.module';
import { OidcParametersService } from '../../services/oidc-parameters.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private oidcParametersService: OidcParametersService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.queryParams)
    this.oidcParametersService.setOidcQueryParameters(this.activatedRoute.snapshot.queryParams);
  }
  onLogin(): void {
    this.router.navigateByUrl(ROUTES.LOGIN);
  }
  onAddUser(): void {
    this.router.navigateByUrl(ROUTES.ADDUSER);
  }
  onAddDevice(): void {
    this.router.navigateByUrl(ROUTES.ADDDEVICE);
  }
  onResetPin(): void {
    this.router.navigateByUrl(ROUTES.CHANGEPIN);
  }
}
