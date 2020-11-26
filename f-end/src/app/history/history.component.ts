import { Component, OnInit } from '@angular/core';

import { HistoryHttpService } from './services/history-http.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private httpService: HistoryHttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getUserHistory();
  }

}
