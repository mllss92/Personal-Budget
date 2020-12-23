import { AmountStatisticsData } from './../../shared/interfaces/amount-statistics-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SavingStatisticsData } from './../../shared/interfaces/saving-statistics-data';
import { MakeHeadersService } from './../../shared/helpers/make-headers.service';
import { DataService } from './../../shared/services/data.service';
import { SpendStatisticsData } from 'src/app/shared/interfaces/spend-statistics-data';

@Injectable()
export class StatisticsHttpService {

  constructor(
    private http: HttpClient,
    private data: DataService,
    private headers: MakeHeadersService
  ) { }

  getSpendsStatistics(reqMonth?: string): Observable<SpendStatisticsData> {
    const reqValue = {
      month: reqMonth ? reqMonth : this.data.month
    };
    return this.http.post<SpendStatisticsData>('api/statistics/spend', reqValue, this.headers.makeHeader());
  }

  getSavingsStatistics(reqMonth?: string): Observable<SavingStatisticsData> {
    const reqValue = {
      month: reqMonth ? reqMonth : this.data.month
    };
    return this.http.post<SavingStatisticsData>('api/statistics/savings', reqValue, this.headers.makeHeader());
  }

  getAmountStatistics(reqMonth?: string): Observable<AmountStatisticsData[]> {
    const reqValue = {
      month: reqMonth ? reqMonth : this.data.month
    };
    return this.http.post<AmountStatisticsData[]>('api/statistics/amount', reqValue, this.headers.makeHeader());
  }

}
