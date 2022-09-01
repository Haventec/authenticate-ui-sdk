import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { IAddUser, IAddUserResponse, IAddUserVo } from '../interfaces/add-user.interface';
import { APPLICATION_UUID } from '../constants/application.constants';
import { ActivateUserVo, IActivateUser, IActivateUserResponse } from '../interfaces/activate-user.interface';
import { AuthService } from './auth.service';
import { IAddDevice, IAddDeviceResponse, IAddDeviceVo } from '../interfaces/add-device.interface';
import { IActivateDevice, IActivateDeviceResponse, IActivateDeviceVo } from '../interfaces/activate-device.interface';
import { ILogin, ILoginResponse, ILoginVo } from '../interfaces/login-interface';
import { IResetPin, IResetPinResponse, IResetPinVo } from '../interfaces/reset-pin.interface';
import { IChangePin, IChangePinResponse, IChangePinVo } from '../interfaces/change-pin.interface';

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
    
    constructor(private http: HttpClient, private auth: AuthService) { }

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

        return this.http.post<IActivateUserResponse>(this.url + this.activateUserUrl, request).pipe(
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

        return this.http.post<IActivateDeviceResponse>(this.url + this.activateDeviceUrl, request).pipe(
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

        return this.http.post<ILoginResponse>(this.url + this.loginUrl, request).pipe(
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

        return this.http.post<IResetPinResponse>(this.url + this.resetPinUrl, request).pipe(
            map(apiResponse => apiResponse),
            catchError(() => EMPTY)
        );
    }
}
