import { Component, OnInit } from '@angular/core';

import { SettingsHttpService } from './services/settings-http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private httpService: SettingsHttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getSettings();
  }

}
