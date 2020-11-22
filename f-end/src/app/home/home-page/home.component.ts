import { Component, OnInit } from '@angular/core';

import { ToasterService } from './../../shared/services/toaster.service';
import { PopupService } from './../pop-up/pop-up-service/popup.service';
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

  saving(name: string, value: number, id: string): void {
    const target = document.getElementById(name);
    this.dataService.savingCardId = id;
    this.dataService.savingCardValue = value;
    if (this.popup.popupConfig.incomeDistribute.active) {
      this.popup.openSavingPopup();
    } else {
      this.savingActive(target as HTMLButtonElement);
    }
  }

  savingActive(target: HTMLButtonElement): void {
    const card = target.offsetParent;
    card.classList.toggle('card-active');
    this.popup.savingActiveToggle();
  }

  onSpend(id: string, value: number): void {
    if (this.popup.popupConfig.saving.active) {
      this.dataService.spendCardId = id;
      this.dataService.spendCardValue = value;
      this.openSpendPopup();
    } else {
      this.toastr.error('Please pick the savings category first!');
    }
  }

  openSpendPopup(): void {
    document.querySelector('.card-active').classList.toggle('card-active');
    this.popup.openSpendPopup();
  }


}
