import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from './../../../shared/interfaces/category';
import { LocalStorageService } from './../../../shared/helpers/local-storage.service';
import { MakeHeadersService } from '../../../shared/helpers/make-headers.service';
import { ErrorHandlerService } from '../../../shared/helpers/error-handler.service';
import { DataService } from '../../../shared/services/data.service';

@Injectable()
export class HomeHttpService {


  constructor(
    private http: HttpClient,
    private data: DataService,
    private errorHandler: ErrorHandlerService,
    private header: MakeHeadersService,
    private localStorageService: LocalStorageService
  ) { }

  addIncome(income: number): void {
    this.http.post('api/income/add', { value: income }, this.header.makeHeader())
      .subscribe(
        res => {
          this.localStorageService.updateUserInfo(res);
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
    this.http.post('api/income/distribute', reqValue, this.header.makeHeader())
      .subscribe(
        (res) => {
          this.localStorageService.updateUserInfo(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  createNewSpend(value: Category): void {
    this.http.post('api/category/create-spend', value, this.header.makeHeader())
      .subscribe(
        res => {
          this.localStorageService.updateUserInfo(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  createNewSaving(value: Category): void {
    this.http.post('api/category/create-saving', value, this.header.makeHeader())
      .subscribe(
        res => {
          this.localStorageService.updateUserInfo(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  addSpend(spendValue: number): void {
    const reqValue = {
      value: spendValue,
      savingId: this.data.savingCardId,
      spendId: this.data.spendCardId,
      month: this.data.month
    };

    this.http.post('api/spend/add', reqValue, this.header.makeHeader())
      .subscribe(
        res => {
          this.localStorageService.updateUserInfo(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

  editIncome(editedValue: number): void {
    this.http.post('api/income/edit', { value: editedValue }, this.header.makeHeader())
      .subscribe(
        res => {
          this.localStorageService.updateUserInfo(res);
        },
        err => {
          this.errorHandler.error(err);
        }
      );
  }

}
