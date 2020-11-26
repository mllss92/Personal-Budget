import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { MakeHeadersService } from './../../shared/helpers/make-headers.service';
import { DataService } from './../../shared/services/data.service';
import { StatisticsData } from 'src/app/shared/interfaces/statistics-data';

@Injectable()
export class StatisticsHttpService {

  constructor(
    private http: HttpClient,
    private data: DataService,
    private headers: MakeHeadersService,
    private errorHandler: ErrorHandlerService
  ) { }

  getStatistics(reqMonth?: string): void {
    const reqValue = {
      month: reqMonth ? reqMonth : this.data.month
    };
    this.http.post('http://localhost:3000/api/statistics/get', reqValue, this.headers.makeHeader())
      .pipe(
        map((res: StatisticsData) => {
          res.spends.forEach(el => {
            delete el.image;
            delete el._id;
          });
          return res;
        })
      )
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

}
