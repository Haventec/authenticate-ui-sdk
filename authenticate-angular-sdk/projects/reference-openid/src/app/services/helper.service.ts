import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public generateTimeStampQueryString(): any {
    const queryParamData = {
      executedTime: Date.now()
    };
    return this.encodeQueryData(queryParamData);
  }

  public encodeQueryData(data: any): string {
    if (!data) {
      return '';
    }
    const ret = [];
    for (const d in data) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    if (ret.length > 0) {
      return '?' + ret.join('&');
    }
    return '';
  }
}
