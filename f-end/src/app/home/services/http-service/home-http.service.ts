import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { NewCategory } from './../../../shared/interfaces/new-category';
import { UpdatedBalance } from './../../../shared/interfaces/updated-balance';
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
      .pipe(
        map((res: IncomeInfo) => {
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

  distributeIncome(distributeValue: number): void {
    const reqValue = {
      value: distributeValue,
      savingId: this.data.savingCardId,
      month: this.data.month
    };
    this.http.post('http://localhost:3000/api/income/distribute', reqValue, this.header.makeHeader())
      .pipe(
        map((res: UpdatedBalance) => {
          const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
          const sum = (res.monthIncome as number[]).reduce(reducer);
          res.monthIncome = sum;
          return res;
        }))
      .subscribe(
        (res) => {
          this.data.avalibleToDistribute = res.avalibleToDistribute;
          this.data.authorizedUser.balance = res.balance;
          this.data.monthIncome = res.monthIncome as number;
          this.data.authorizedUser.savings = res.savings;
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  createNewSpend(value: NewCategory): void {
    const reqValue = {
      name: value.name,
      image: value.image,
      month: this.data.month
    };
    this.http.post('http://localhost:3000/api/category/create-spend', reqValue, this.header.makeHeader())
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  createNewSaving(value: NewCategory): void {
    const reqValue = {
      name: value.name,
      image: value.image,
      month: this.data.month
    };
    this.http.post('http://localhost:3000/api/category/create-saving', reqValue, this.header.makeHeader())
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
