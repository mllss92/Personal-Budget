import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { ProfileInfo } from './../../shared/interfaces/profile-info';
import { MakeHeadersService } from './../../shared/helpers/make-headers.service';

@Injectable()
export class SettingsHttpService {

  constructor(
    private http: HttpClient,
    private header: MakeHeadersService,
    private location: Location
  ) { }

  getSettings(): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>('http://localhost:3000/api/settings/get', this.header.makeHeader());
  }

  goBack(): void {
    this.location.back();
  }
}
