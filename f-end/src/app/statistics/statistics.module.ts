import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsHttpService } from './services/statistics-http.service';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';


@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModuleModule
  ],
  providers: [
    StatisticsHttpService
  ]
})
export class StatisticsModule { }
