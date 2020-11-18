import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { IncomeInfo } from '../../../shared/interfaces/income-info';
import { MakeHeadersService } from '../../../shared/helpers/make-headers.service';
import { ErrorHandlerService } from '../../../shared/helpers/error-handler.service';
import { DataService } from '../../../shared/services/data.service';

@Injectable()
export class HomeHttpService {


  constructor(
    private http: HttpClient,
    private data: DataService,
    private errorHandler: ErrorHandlerService,
    private header: MakeHeadersService
  ) { }

  getIncomesInfo(): void {
    this.http.post('http://localhost:3000/api/income/get', { month: this.data.month }, this.header.makeHeader())
      .pipe(map((res: IncomeInfo) => {
        const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
        const sum = res.value.reduce(reducer);
        return {
          avalibleToDistribute: res.avalibleToDistribute,
          value: sum
        };
      }))
      .subscribe(
        res => {
          this.data.monthIncome = res.value;
          this.data.avalibleToDistribute = res.avalibleToDistribute;
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  addIncome(income: number): void {
    this.http.post('http://localhost:3000/api/income/add', { value: income }, this.header.makeHeader())
      .subscribe(
        (res: number) => {
          this.data.avalibleToDistribute = res;
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }
}
