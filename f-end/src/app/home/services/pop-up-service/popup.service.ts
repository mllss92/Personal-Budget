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
    }
  };

  constructor() { }

  togglePopup(): void {
    this.popupConfig.popup = !this.popupConfig.popup;
  }


  toggleIncomeAdd(): void {
    this.popupConfig.incomeAdd = !this.popupConfig.incomeAdd;
  }

  toggleIncomeEdit(): void {
    this.popupConfig.incomeEdit = !this.popupConfig.incomeEdit;
  }

  toggleIncomeDistributeActive(): void {
    this.popupConfig.incomeDistribute.active = !this.popupConfig.incomeDistribute.active;
  }

  toggleIncomeDistributeOpened(): void {
    this.popupConfig.incomeDistribute.opened = !this.popupConfig.incomeDistribute.opened;
  }

  toggleSavingActive(): void {
    this.popupConfig.saving.active = !this.popupConfig.saving.active;
  }

  toggleSavingOpened(): void {
    this.popupConfig.saving.opened = !this.popupConfig.saving.opened;
  }
}
