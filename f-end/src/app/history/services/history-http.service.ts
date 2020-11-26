import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MakeHeadersService } from './../../shared/helpers/make-headers.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';

@Injectable()
export class HistoryHttpService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private header: MakeHeadersService
  ) { }

  getUserHistory(): void {
    this.http.get('http://localhost:3000/api/history/get', this.header.makeHeader())
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }
}
