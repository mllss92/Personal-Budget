import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateService]
    });
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('editYear()', () => {
    it('должен вызвать метод "add" у объекта клонированного с "service.date$.value" и после вызвать метод "next" у "service.date$"', () => {
      const mockValue = moment();
      spyOn(service.date$.value, 'clone').and.returnValue(mockValue);
      spyOn(mockValue, 'add');
      spyOn(service.date$, 'next');

      service.editYear(2021);

      expect(mockValue.add).toHaveBeenCalled();
      expect(service.date$.next).toHaveBeenCalled();
    });
  });

  describe('editMonth()', () => {
    it('должен вызвать метод "set" у объекта клонированного с "service.date$.value" и после вызвать метод "next" у "service.date$"', () => {
      const mockValue = moment();
      spyOn(service.date$.value, 'clone').and.returnValue(mockValue);
      spyOn(mockValue, 'set');
      spyOn(service.date$, 'next');

      service.editMonth(1);

      expect(mockValue.set).toHaveBeenCalled();
      expect(service.date$.next).toHaveBeenCalled();
    });
  });
});
