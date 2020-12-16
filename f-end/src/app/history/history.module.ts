import { DateService } from './services/date.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HistoryHttpService } from './services/history-http.service';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModuleModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HistoryHttpService,
    DateService
  ]
})
export class HistoryModule { }
