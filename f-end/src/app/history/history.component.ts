import { HistoryData } from './../shared/interfaces/history';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../shared/helpers/error-handler.service';
import { DateService } from './services/date.service';
import { HistoryHttpService } from './services/history-http.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: HistoryData[] = [];
  loading = false;

  constructor(
    private httpService: HistoryHttpService,
    private errorHandler: ErrorHandlerService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {
    this.getUserHistory();
  }

  editYear(num: number): void {
    this.dateService.editYear(num);
    this.getUserHistory();
  }

  editMonth(e: MatTabChangeEvent): void {
    this.dateService.editMonth(e.index);
    this.getUserHistory();
  }

  getUserHistory(): void {
    const month = this.dateService.date$.value.format('MM.yyyy');
    this.history = [];
    this.loading = true;
    this.httpService.getUserHistory(month).subscribe(
      res => {
        this.history = res;
        this.loading = false;
      },
      err => {
        this.errorHandler.error(err);
        this.loading = false;
      }
    );
  }

}
