import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ProfileInfo } from './../shared/interfaces/profile-info';
import { ErrorHandlerService } from './../shared/helpers/error-handler.service';
import { DataService } from './../shared/services/data.service';
import { SettingsHttpService } from './services/settings-http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profileInfo: ProfileInfo = {
    name: '',
    lastName: '',
    email: ''
  };
  lastLogin: string;

  constructor(
    private httpService: SettingsHttpService,
    public data: DataService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getSettings();
    this.lastLogin = moment(this.data.authorizedUser.lastLogin).format('DD-MM-YYYY HH:mm:SS');
  }

  getSettings(): void {
    this.httpService.getSettings()
      .subscribe(
        res => this.profileInfo = res,
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  goBack(): void {
    this.httpService.goBack();
  }

}
