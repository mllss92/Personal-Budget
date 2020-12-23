import { Component, Input, OnInit } from '@angular/core';

import { Category } from './../../shared/interfaces/category';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css']
})
export class ChartBarComponent implements OnInit {

  @Input() chartData: Category[];

  constructor() { }

  ngOnInit(): void {
  }

}
