import { Injectable } from '@angular/core';

import { DataService } from './../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class MakeHeadersService {

  constructor(
    private data: DataService
  ) { }

  makeHeader(): object {
    return {
      headers: {
        Authorization: this.data.authorizedUser.token
      }
    };
  }
}
