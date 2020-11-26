import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsHttpService } from './services/settings-http.service';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModuleModule
  ],
  providers: [
    SettingsHttpService
  ]
})
export class SettingsModule { }
