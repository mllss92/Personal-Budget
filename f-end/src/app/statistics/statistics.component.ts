import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';

import { AmountStatisticsData } from './../shared/interfaces/amount-statistics-data';
import { SavingStatisticsData } from './../shared/interfaces/saving-statistics-data';
import { SpendStatisticsData } from './../shared/interfaces/spend-statistics-data';
import { ErrorHandlerService } from './../shared/helpers/error-handler.service';
import { DateService } from './services/date.service';
import { StatisticsHttpService } from './services/statistics-http.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  loading = false;

  spendsStatistics: SpendStatisticsData;
  savingsStatistics: SavingStatisticsData;
  amountStatistics: AmountStatisticsData[];


  constructor(
    private httpService: StatisticsHttpService,
    private errorHandler: ErrorHandlerService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {
    this.createStatisticSubscription();
  }

  createStatisticSubscription(reqMonth?: string): void {
    this.loading = true;
    zip(
      this.httpService.getSpendsStatistics(reqMonth),
      this.httpService.getSavingsStatistics(reqMonth),
      this.httpService.getAmountStatistics(reqMonth)
    ).subscribe(
      res => {
        this.spendsStatistics = res[0];
        this.savingsStatistics = res[1];
        this.amountStatistics = res[2];
      },
      err => {
        this.errorHandler.error(err);
      },
      () => {
        this.loading = false;
      }
    );
  }

  editMonth(num: number): void {
    this.dateService.editMonth(num);
    this.createStatisticSubscription(this.dateService.date$.value.format('MM.yyyy'));
  }

}
