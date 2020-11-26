import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MakeHeadersService } from './../../shared/helpers/make-headers.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';

@Injectable()
export class SettingsHttpService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private header: MakeHeadersService
  ) { }

  getSettings(): void {
    this.http.get('http://localhost:3000/api/settings/get', this.header.makeHeader())
      .subscribe(
        res => console.log(res),
        err => {
          this.errorHandler.error(err);
        }
      );
  }
}
