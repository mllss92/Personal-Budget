import { Component, OnInit } from '@angular/core';

import { PopupService } from './../services/pop-up-service/popup.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(public popup: PopupService) { }

  ngOnInit(): void {

  }

  incomeAdd(): void {
    this.popup.toggleIncomeAdd();
    this.popup.togglePopup();
  }

  incomeEdit(): void {
    this.popup.toggleIncomeEdit();
    this.popup.togglePopup();
  }

  incomeSaving(): void {
    this.popup.toggleIncomeDistributeOpened();
    this.popup.togglePopup();
  }

  spendSaving(): void {
    this.popup.toggleSavingOpened();
    this.popup.togglePopup();
  }

  incomeAddDone(value: number): void {
    console.log(value);
  }
}
