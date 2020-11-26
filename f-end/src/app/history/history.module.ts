import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryHttpService } from './services/history-http.service';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModuleModule
  ],
  providers: [
    HistoryHttpService
  ]
})
export class HistoryModule { }
