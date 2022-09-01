import { Injectable } from '@angular/core';
import { HaventecAuthenticate } from '@haventec/authenticate-web-sdk';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUser!: string;
    private haventecAuthenticate!: HaventecAuthenticate;

    constructor() {
        const currentUser = localStorage.getItem('haventec_username');
        if (currentUser) {
            this.setCurrentUser(currentUser);
        }
    }

    public setCurrentUser(username: string) {
        if (username && this.currentUser !== username) {
            this.currentUser = username;
            if (!this.haventecAuthenticate) {
                this.haventecAuthenticate = new HaventecAuthenticate();
            }
            this.haventecAuthenticate.initialiseStorage(username);
        }
    }
    public getHashPin(pin: string): string {
        return this.haventecAuthenticate.hashPin(pin);;
    }
    public getUsername(): any {
        return this.haventecAuthenticate ? this.haventecAuthenticate.getUsername() : undefined;
    }
    public getAccessToken(): string {
        return this.haventecAuthenticate.getAccessToken();
    }
    public getDeviceUuid(): string {
        return this.haventecAuthenticate.getDeviceUuid();
    }
    public getUserUuid(): string {
        return this.haventecAuthenticate.getUserUuid();
    }
    public getAuthKey(): string {
        return this.haventecAuthenticate.getAuthKey();
    }
    public updateDataFromResponse(response: any): void {
        this.haventecAuthenticate.updateStorage(response);
    }
    public invalidateToken(): void {
        this.haventecAuthenticate.clearAccessToken();
    }
    public getDeviceName(): string {
        return this.haventecAuthenticate.getDeviceName();
    }

}
