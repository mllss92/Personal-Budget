import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoryData } from './../../shared/interfaces/history';
import { MakeHeadersService } from './../../shared/helpers/make-headers.service';

@Injectable()
export class HistoryHttpService {

  constructor(
    private http: HttpClient,
    private header: MakeHeadersService
  ) { }

  getUserHistory(month: string): Observable<HistoryData[]> {
    return this.http.post<HistoryData[]>(`api/history/get`, { month }, this.header.makeHeader());
  }
}
