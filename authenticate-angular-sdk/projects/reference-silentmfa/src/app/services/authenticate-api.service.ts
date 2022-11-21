import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, from } from 'rxjs';
import { ILogin, ILoginResponse } from '../interfaces/login-interface';
import { HaventecMfaClient } from "@haventec/mfa-client";

@Injectable({
    providedIn: 'root'
})
export class AuthenticateApiService {

    state: ILogin = {
        username: "",
        password: ""
    }

    client: HaventecMfaClient = new HaventecMfaClient({
        pollTimeInMs: 5000,
        checkUrl: "http://localhost:8081/smfa/check",
        registerUrl: "http://localhost:8081/smfa/register",
        loginUrl: "http://localhost:8081/smfa/login",
        restartPollOnLogin: true
    });

    constructor() { }

    login(login: ILogin): Observable<ILoginResponse> {
        return from(this.client.loginWithRegisterFallback({ username: login.username, password: login.password })).pipe(
            map(apiResponse => apiResponse as any),
            catchError(e => {
                window.alert(e.errorCode + ': Contact your administrator.');
                return EMPTY;
            })
        )
    }
}
