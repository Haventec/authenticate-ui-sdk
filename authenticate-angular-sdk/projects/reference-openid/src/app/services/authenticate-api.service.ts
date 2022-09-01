import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { IAddUser, IAddUserResponse, IAddUserVo } from '../interfaces/add-user.interface';
import { APPLICATION_UUID } from '../constants/application.constants';
import { ActivateUserVo, IActivateUser, IActivateUserResponse } from '../interfaces/activate-user.interface';
import { AuthService } from './auth.service';
import { IAddDevice, IAddDeviceResponse, IAddDeviceVo } from '../interfaces/add-device.interface';
import { IActivateDevice, IActivateDeviceResponse, IActivateDeviceVo } from '../interfaces/activate-device.interface';
import { ILogin, ILoginResponse, ILoginVo } from '../interfaces/login-interface';
import { IResetPin, IResetPinResponse, IResetPinVo } from '../interfaces/reset-pin.interface';
import { IChangePin, IChangePinResponse, IChangePinVo } from '../interfaces/change-pin.interface';
import { HelperService } from './helper.service';
import { OidcParametersService } from './oidc-parameters.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateApiService {

  url = '/api';
  registerUserUrl = '/self-service/user';
  activateUserUrl = '/activate/user';
  registerDeviceUrl = '/device';
  activateDeviceUrl = '/activate/device';
  loginUrl = '/login';
  forgotPinUrl = '/forgot-pin';
  resetPinUrl = '/reset-pin';

  constructor(private http: HttpClient, private auth: AuthService,
    private helperService: HelperService, private oidcParameterService: OidcParametersService) { }

  addUser(user: IAddUser): Observable<IAddUserResponse> {

    const request: IAddUserVo = {
      applicationUuid: APPLICATION_UUID,
      username: user.username,
      email: user.email
    };

    return this.http.post<IAddUserResponse>(this.url + this.registerUserUrl, request).pipe(
      map(apiResponse => apiResponse),
      catchError(() => EMPTY)
    );
  }

  activateUser(activate: IActivateUser): Observable<IActivateUserResponse> {

    const request: ActivateUserVo = {
      username: this.auth.getUsername(),
      applicationUuid: APPLICATION_UUID,
      activationToken: activate.activationToken,
      hashedPin: activate.hashedPin,
      deviceName: this.auth.getDeviceName()
    }

    const queryParamStr = this.helperService.generateTimeStampQueryString();

    return this.http.post<IActivateUserResponse>(this.url + this.activateUserUrl + queryParamStr, request, { params: this.getParams() }).pipe(
      map(apiResponse => apiResponse),
      catchError(() => EMPTY)
    );
  }

  addDevice(device: IAddDevice): Observable<IAddDeviceResponse> {

    const request: IAddDeviceVo = {
      applicationUuid: APPLICATION_UUID,
      username: device.username,
      deviceName: this.auth.getDeviceName()
    };

    return this.http.post<IAddDeviceResponse>(this.url + this.registerDeviceUrl, request).pipe(
      map(apiResponse => apiResponse),
      catchError(() => EMPTY)
    );
  }

  activateDevice(activate: IActivateDevice): Observable<IActivateDeviceResponse> {

    const request: IActivateDeviceVo = {
      username: this.auth.getUsername(),
      applicationUuid: APPLICATION_UUID,
      deviceUuid: this.auth.getDeviceUuid(),
      hashedPin: activate.hashedPin,
      activationToken: activate.activationToken
    }

    const queryParamStr = this.helperService.generateTimeStampQueryString();

    return this.http.post<IActivateDeviceResponse>(this.url + this.activateDeviceUrl + queryParamStr, request, { params: this.getParams() }).pipe(
      map(apiResponse => apiResponse),
      catchError(() => EMPTY)
    );
  }

  login(login: ILogin): Observable<ILoginResponse> {

    const request: ILoginVo = {
      username: login.username,
      applicationUuid: APPLICATION_UUID,
      deviceUuid: this.auth.getDeviceUuid(),
      authKey: this.auth.getAuthKey(),
      hashedPin: login.hashedPin
    }

    const queryParamStr = this.helperService.generateTimeStampQueryString();

    return this.http.post<ILoginResponse>(this.url + this.loginUrl + queryParamStr, request, { params: this.getParams() }).pipe(
      map(apiResponse => apiResponse),
      catchError(() => EMPTY)
    );
  }

  forgotPin(forgot: IChangePin): Observable<IChangePinResponse> {

    const request: IChangePinVo = {
      username: forgot.username,
      applicationUuid: APPLICATION_UUID,
      deviceUuid: this.auth.getDeviceUuid(),
    }

    return this.http.post<IChangePinResponse>(this.url + this.forgotPinUrl, request).pipe(
      map(apiResponse => apiResponse),
      catchError(() => EMPTY)
    );
  }

  resetPin(reset: IResetPin): Observable<IResetPinResponse> {

    const request: IResetPinVo = {
      username: this.auth.getUsername(),
      applicationUuid: APPLICATION_UUID,
      deviceUuid: this.auth.getDeviceUuid(),
      hashedPin: reset.hashedPin,
      resetPinToken: reset.resetPinToken
    }

    const queryParamStr = this.helperService.generateTimeStampQueryString();

    return this.http.post<IResetPinResponse>(this.url + this.resetPinUrl + queryParamStr, request, { params: this.getParams() }).pipe(
      map(apiResponse => apiResponse),
      catchError(() => EMPTY)
    );
  }

  private getParams(): any {
    let oidcParams = this.oidcParameterService.getOpenIDParams();
    const nonce = oidcParams.nonce; // ??
    const htOidTxid = oidcParams.htOidTxid; // how and when do these get populated?
    let params = { ...oidcParams };
    if (nonce) {
      params = {
        ...params,
        nonce
      };
    }
    if (htOidTxid) {
      params = {
        ...params,
        htOidTxid
      }
    }
    return params;
  }
}
