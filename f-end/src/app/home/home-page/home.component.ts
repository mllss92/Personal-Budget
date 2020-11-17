import { Component, OnInit } from '@angular/core';

import { ToasterService } from './../../shared/services/toaster.service';
import { PopupService } from './../services/pop-up-service/popup.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public popup: PopupService,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
  }

  incomeAdd(): void {
    this.popup.togglePopup();
    this.popup.toggleIncomeAdd();
  }

  incomeEdit(): void {
    this.popup.togglePopup();
    this.popup.toggleIncomeEdit();
  }

  incomeDistributeActive(): void {
    this.popup.togglePopup();
    this.popup.toggleIncomeDistributeActive();
  }

  saving(target: HTMLButtonElement): void {
    if (this.popup.popupConfig.incomeDistribute.active) {
      this.openSavingPopup();
    } else {
      this.savingActive(target);
    }
  }

  openSavingPopup(): void {
    this.popup.toggleIncomeDistributeActive();
    this.popup.toggleIncomeDistributeOpened();
  }

  savingActive(target: HTMLButtonElement): void {
    const card = target.offsetParent;
    card.classList.toggle('card-active');
    this.popup.togglePopup();
    this.popup.toggleSavingActive();
  }

  spend(target: HTMLButtonElement): void {
    if (this.popup.popupConfig.saving.active) {
      this.openSpendPopup();
    } else {
      this.toastr.error('Please pick the savings category first!');
    }
  }

  openSpendPopup(): void {
    document.querySelector('.card-active').classList.toggle('card-active');
    this.popup.toggleSavingActive();
    this.popup.toggleSavingOpened();
  }

}
