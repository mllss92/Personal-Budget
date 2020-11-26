import { Component, OnInit } from '@angular/core';

import { StatisticsHttpService } from './services/statistics-http.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(
    private httpService: StatisticsHttpService
  ) { }

  ngOnInit(): void {
    this.httpService.getStatistics();
  }

}
