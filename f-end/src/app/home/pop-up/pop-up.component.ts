import { Component, OnInit, ViewChild } from '@angular/core';

import { Category } from './../../shared/interfaces/category';
import { DataService } from './../../shared/services/data.service';
import { CalculatorComponent } from './../calculator/calculator.component';
import { HomeHttpService } from '../services/http-service/home-http.service';
import { PopupService } from './pop-up-service/popup.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  @ViewChild(CalculatorComponent)
  private calcComponent: CalculatorComponent;

  constructor(
    public popup: PopupService,
    private http: HomeHttpService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {

  }

  incomeAddDone(value: number): void {
    this.http.addIncome(value);
    this.popup.incomeAddToggle();
  }

  distributeDone(value: number): void {
    if (value > this.dataService.authorizedUser.avalibleToDistribute) {
      this.calcComponent.distributeError();
    } else {
      this.http.distributeIncome(value);
      this.popup.closeSavingPopup();
    }
  }

  createNewSpend(value: Category): void {
    this.http.createNewSpend(value);
    this.popup.spendCreateToogle();
  }

  createNewSaving(value: Category): void {
    this.http.createNewSaving(value);
    this.popup.savingCreateToogle();
  }

  addSpend(value: number): void {
    if (value > this.dataService.savingCardValue) {
      this.calcComponent.spendError();
    } else {
      this.http.addSpend(value);
      this.popup.closeSpendPopup();
    }
  }

  incomeEdit(value: number): void {
    this.http.editIncome(value);
    this.popup.incomeEditToggle();
  }
}
