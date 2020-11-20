import { Injectable } from '@angular/core';

import { PopUpConfig } from './../../../shared/interfaces/popup-config';

@Injectable()
export class PopupService {

  popupConfig: PopUpConfig = {
    popup: false,
    incomeAdd: false,
    incomeDistribute: {
      active: false,
      opened: false
    },
    incomeEdit: false,
    saving: {
      active: false,
      opened: false
    },
    createSavingCard: false,
    createSpendCard: false
  };

  constructor() { }

  incomeAddToggle(): void {
    this.popupConfig.popup = !this.popupConfig.popup;
    this.popupConfig.incomeAdd = !this.popupConfig.incomeAdd;
  }

  incomeEditToggle(): void {
    this.popupConfig.popup = !this.popupConfig.popup;
    this.popupConfig.incomeEdit = !this.popupConfig.incomeEdit;
  }

  incomeDistributeActive(): void {
    this.popupConfig.popup = !this.popupConfig.popup;
    this.popupConfig.incomeDistribute.active = !this.popupConfig.incomeDistribute.active;
  }

  openSavingPopup(): void {
    this.popupConfig.incomeDistribute.active = !this.popupConfig.incomeDistribute.active;
    this.popupConfig.incomeDistribute.opened = !this.popupConfig.incomeDistribute.opened;
  }

  closeSavingPopup(): void {
    this.popupConfig.incomeDistribute.opened = !this.popupConfig.incomeDistribute.opened;
    this.popupConfig.popup = !this.popupConfig.popup;
  }

  savingActiveToggle(): void {
    this.popupConfig.popup = !this.popupConfig.popup;
    this.popupConfig.saving.active = !this.popupConfig.saving.active;
  }

  openSpendPopup(): void {
    this.popupConfig.saving.active = !this.popupConfig.saving.active;
    this.popupConfig.saving.opened = !this.popupConfig.saving.opened;
  }

  closeSpendPopup(): void {
    this.popupConfig.saving.opened = !this.popupConfig.saving.opened;
    this.popupConfig.popup = !this.popupConfig.popup;
  }

  spendCreateToogle(): void {
    this.popupConfig.popup = !this.popupConfig.popup;
    this.popupConfig.createSpendCard = !this.popupConfig.createSpendCard;
  }

  savingCreateToogle(): void {
    this.popupConfig.popup = !this.popupConfig.popup;
    this.popupConfig.createSavingCard = !this.popupConfig.createSavingCard;
  }
}
