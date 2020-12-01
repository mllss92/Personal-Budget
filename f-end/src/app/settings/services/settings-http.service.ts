import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { LocalStorageService } from './../../shared/helpers/local-storage.service';
import { ProfileInfo } from './../../shared/interfaces/profile-info';
import { MakeHeadersService } from './../../shared/helpers/make-headers.service';

@Injectable()
export class SettingsHttpService {

  constructor(
    private http: HttpClient,
    private header: MakeHeadersService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private errorHandler: ErrorHandlerService
  ) { }

  getSettings(): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>('api/settings/get', this.header.makeHeader());
  }

  goBack(): void {
    this.location.back();
  }

  uploadPhoto(data: FormData): Observable<any> {
    return this.http.post<string>('api/settings/upload', data, this.header.makeHeader());
  }
}
