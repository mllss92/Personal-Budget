import { TestBed, inject } from '@angular/core/testing';

import { PopupService } from './popup.service';

describe('PopupService', () => {
  let service: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupService]
    });
    service = TestBed.inject(PopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('метод incomeAddToggle()', () => {
    it('должен сменить значение "popupConfig.popup" и "popupConfig.incomeAdd" на противоположное', () => {
      service.popupConfig.popup = true;
      service.popupConfig.incomeAdd = true;
      service.incomeAddToggle();
      expect(service.popupConfig.popup).toBeFalse();
      expect(service.popupConfig.incomeAdd).toBeFalse();
    });
  });

  describe('метод incomeEditToggle()', () => {
    it('должен сменить значение "popupConfig.popup" и "popupConfig.incomeEdit" на противоположное', () => {
      service.popupConfig.popup = true;
      service.popupConfig.incomeEdit = true;
      service.incomeEditToggle();
      expect(service.popupConfig.popup).toBeFalse();
      expect(service.popupConfig.incomeEdit).toBeFalse();
    });
  });

  describe('метод incomeDistributeActive()', () => {
    it('должен сменить значение "popupConfig.popup" и "popupConfig.incomeDistribute.active" на противоположное', () => {
      service.popupConfig.popup = true;
      service.popupConfig.incomeDistribute.active = true;
      service.incomeDistributeActive();
      expect(service.popupConfig.popup).toBeFalse();
      expect(service.popupConfig.incomeDistribute.active).toBeFalse();
    });
  });

  describe('метод openSavingPopup()', () => {
    it('должен сменить значение "popupConfig.incomeDistribute.opened" и "popupConfig.incomeDistribute.active" на противоположное', () => {
      service.popupConfig.incomeDistribute.active = true;
      service.popupConfig.incomeDistribute.opened = true;
      service.openSavingPopup();
      expect(service.popupConfig.incomeDistribute.active).toBeFalse();
      expect(service.popupConfig.incomeDistribute.opened).toBeFalse();
    });
  });

  describe('метод closeSavingPopup()', () => {
    it('должен сменить значение "popupConfig.incomeDistribute.opened" и "popupConfig.popup" на противоположное', () => {
      service.popupConfig.incomeDistribute.opened = true;
      service.popupConfig.popup = true;
      service.closeSavingPopup();
      expect(service.popupConfig.incomeDistribute.active).toBeFalse();
      expect(service.popupConfig.popup).toBeFalse();
    });
  });

  describe('метод savingActiveToggle()', () => {
    it('должен сменить значение "popupConfig.saving.active" и "popupConfig.popup" на противоположное', () => {
      service.popupConfig.popup = true;
      service.popupConfig.saving.active = true;
      service.savingActiveToggle();
      expect(service.popupConfig.popup).toBeFalse();
      expect(service.popupConfig.saving.active).toBeFalse();
    });
  });

  describe('метод openSpendPopup()', () => {
    it('должен сменить значение "popupConfig.saving.active" и "popupConfig.saving.opened" на противоположное', () => {
      service.popupConfig.saving.active = true;
      service.popupConfig.saving.opened = true;
      service.openSpendPopup();
      expect(service.popupConfig.saving.active).toBeFalse();
      expect(service.popupConfig.saving.opened).toBeFalse();
    });
  });

  describe('метод closeSpendPopup()', () => {
    it('должен сменить значение "popupConfig.popup" и "popupConfig.saving.opened" на противоположное', () => {
      service.popupConfig.saving.opened = true;
      service.popupConfig.popup = true;
      service.closeSpendPopup();
      expect(service.popupConfig.saving.active).toBeFalse();
      expect(service.popupConfig.popup).toBeFalse();
    });
  });

  describe('метод spendCreateToogle()', () => {
    it('должен сменить значение "popupConfig.popup" и "popupConfig.createSpendCard" на противоположное', () => {
      service.popupConfig.popup = true;
      service.popupConfig.createSpendCard = true;
      service.spendCreateToogle();
      expect(service.popupConfig.popup).toBeFalse();
      expect(service.popupConfig.createSpendCard).toBeFalse();
    });
  });

  describe('метод savingCreateToogle()', () => {
    it('должен сменить значение "popupConfig.popup" и "popupConfig.createSavingCard" на противоположное', () => {
      service.popupConfig.popup = true;
      service.popupConfig.createSavingCard = true;
      service.savingCreateToogle();
      expect(service.popupConfig.popup).toBeFalse();
      expect(service.popupConfig.createSavingCard).toBeFalse();
    });
  });
});
