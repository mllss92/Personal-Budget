import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToasterService } from './../services/toaster.service';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let toaster: ToasterService;
  let error: HttpErrorResponse;

  const routerStub = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, RouterTestingModule],
      providers: [
        ErrorHandlerService,
        ToasterService,
        { provide: Router, useValue: routerStub }
      ]
    });

    service = TestBed.inject(ErrorHandlerService);
    toaster = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('метод error()', () => {
    it('должен вызвать метод "error" у "ToasterService" и "navigate" у "Router" если параметр аргумента "error" === "Unauthorized"', () => {
      const router = TestBed.inject(Router);
      error = new HttpErrorResponse({ error: 'Unauthorized' });
      spyOn(toaster, 'error');

      service.error(error);
      expect(toaster.error).toHaveBeenCalledWith('Token is expired. Please sign in!');
      expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
    });

    it('должен вызвать метод "error" у "ToasterService" с аргументом "error.message" объекта ошибки если такой имеется', () => {
      error = new HttpErrorResponse({ error: { message: 'err' } });
      spyOn(toaster, 'error');

      service.error(error);
      expect(toaster.error).toHaveBeenCalledWith('err');
    });

    it('должен вызвать метод "error" у "ToasterService" с аргументом "message" объекта ошибки если нет "error.message"', () => {
      error = new HttpErrorResponse({ error: { message: false } });
      spyOn(toaster, 'error');

      service.error(error);
      expect(toaster.error).toHaveBeenCalledWith(error.message);
    });
  });
});
