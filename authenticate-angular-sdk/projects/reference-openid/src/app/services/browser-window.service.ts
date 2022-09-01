import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserWindowService {

  constructor() { }

  static get currentLocationHostName() {
    return window.location.hostname;
  }
  loadWindow(url?: string, target?: string, features?: string): Window | null {
    return window.open(url, target, features);
  }
}

