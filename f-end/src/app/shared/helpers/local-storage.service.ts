import { Injectable } from '@angular/core';

import { DataService } from './../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private dataService: DataService
  ) { }

  updateUserInfo(object: any): void { // тут без type: any не обойтись =(
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const value = object[key];
        this.dataService.authorizedUser[key] = value;
        localStorage.setItem(key, JSON.stringify(value));
      }
    }

  }

}
