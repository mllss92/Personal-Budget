import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { StatisticsHttpService } from './services/statistics-http.service';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { DateService } from './services/date.service';
import { ChartBarComponent } from './chart-bar/chart-bar.component';


@NgModule({
  declarations: [StatisticsComponent, ChartBarComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModuleModule,
    NgxChartsModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    StatisticsHttpService,
    DateService
  ]
})
export class StatisticsModule { }
