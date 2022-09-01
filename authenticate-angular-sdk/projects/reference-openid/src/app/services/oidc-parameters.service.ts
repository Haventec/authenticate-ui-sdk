import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { IOpenIdParameters } from '../interfaces/oidc-parameters';

@Injectable({
  providedIn: 'root'
})
export class OidcParametersService {

  private oidcParams: IOpenIdParameters = {} as IOpenIdParameters;

  constructor() { }

  setOidcQueryParameters(queryParamMap: Params): IOpenIdParameters {
    let oidcParams: IOpenIdParameters = {} as IOpenIdParameters;
    Object.keys(queryParamMap).forEach((key) => {
      if (key === 'login_hint' && queryParamMap[key]) {
        oidcParams[key as keyof IOpenIdParameters] = queryParamMap[key].trim().replace(' ', '+');
      } else {
        oidcParams[key as keyof IOpenIdParameters] = queryParamMap[key];
      }
    });
    this.oidcParams = oidcParams;
    return oidcParams;
  }

  public getOpenIDParams(): IOpenIdParameters {
    return this.oidcParams;
  }

  public createRedirectUri(code: string, oidcParams: IOpenIdParameters): string {
    console.log('code !! ', code);
    return oidcParams.redirect_uri.valueOf() + '?state=' + oidcParams.state + (code ? '&code=' + code : '');
  }

  public hasOpenIDParams(): boolean {
    return Object.keys(this.getOpenIDParams()).length > 0;
  }
}
