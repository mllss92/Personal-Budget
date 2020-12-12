import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RegistrationData } from './../../shared/interfaces/registration-data';
import { LocalStorageService } from './../../shared/helpers/local-storage.service';
import { LoginData } from './../../shared/interfaces/login-data';
import { AuthorizedUser } from './../../shared/interfaces/authorized-user';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let backend: HttpTestingController;
  let localStorageService: LocalStorageService;
  let toaster: ToasterService;
  let router: Router;
  let errorHandler: ErrorHandlerService;

  const data = 'Server error';
  const mockErrorResponse = { status: 500, statusText: 'Server error' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      providers: [AuthService,
        { provide: ToasterService, useValue: { success: jasmine.createSpy('success') } },
        { provide: LocalStorageService, useValue: { updateUserInfo: jasmine.createSpy('updateUserInfo') } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ErrorHandlerService, useValue: { error: jasmine.createSpy('error') } }
      ]
    });

    service = TestBed.inject(AuthService);
    backend = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
    toaster = TestBed.inject(ToasterService);
    router = TestBed.inject(Router);
    errorHandler = TestBed.inject(ErrorHandlerService);
  });

  afterEach(() => {
    backend.verify();
  });

  it('существует ли сервис', () => {
    expect(service).toBeTruthy();
  });

  describe('метод login()', () => {
    const mockLoginData: LoginData = {
      email: 'email',
      password: 'password'
    };

    const mockUser: AuthorizedUser = {
      name: 'test',
      lastName: 'test',
      _id: 'id',
      token: 'token',
      balance: 123,
      lastLogin: new Date(),
      monthIncome: [0],
      avalibleToDistribute: 123,
      savings: [],
      spends: [],
      login: true,
      expenses: 123
    };

    it('должен при вызове сделать "POST" запрос', () => {
      service.login(mockLoginData);

      const request = backend.expectOne('api/auth/login');
      expect(request.request.method).toBe('POST');
    });

    it('должен вызвать метод "updateUserInfo" у "LocalStorageService" при получении ответа на "POST" запрос', () => {
      service.login(mockLoginData);

      const request = backend.expectOne('api/auth/login');
      request.flush(mockUser);
      expect(localStorageService.updateUserInfo).toHaveBeenCalledWith(mockUser);
    });

    it('должен вызвать метод "success" у "ToasterService" при получении ответа на "POST" запрос', () => {
      service.login(mockLoginData);

      const request = backend.expectOne('api/auth/login');
      request.flush(mockUser);
      expect(toaster.success).toHaveBeenCalledWith(`Welcome ${mockUser.name} ${mockUser.lastName}!`);
    });

    it('должен направить по пути "home" при получении ответа на "POST" запрос', () => {
      service.login(mockLoginData);

      const request = backend.expectOne('api/auth/login');
      request.flush((mockUser));
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });

    it('долже вызвать метод "error" у "ErrorHandlerService" при получении ошибки на "POST" запрос', () => {
      service.login(mockLoginData);

      const request = backend.expectOne('api/auth/login');
      request.flush(data, mockErrorResponse);

      expect(errorHandler.error).toHaveBeenCalled();
    });

  });

  describe('метод register()', () => {
    const mockRegistrationData: RegistrationData = {
      email: 'email',
      password: 'password',
      name: 'name',
      lastName: 'lastName'
    };
    const response = JSON.stringify(true);

    it('должен при вызове сделать "POST" запрос', () => {
      service.register(mockRegistrationData);

      const request = backend.expectOne('api/auth/register');
      expect(request.request.method).toBe('POST');
    });

    it('должен вызвать метод "success" у "ToasterService" при получении ответа на "POST" запрос', () => {
      service.register(mockRegistrationData);

      const request = backend.expectOne('api/auth/register');
      request.flush(response);
      expect(toaster.success).toHaveBeenCalled();
    });

    it('должен направить по пути "auth/login" при получении ответа на "POST" запрос', () => {
      service.register(mockRegistrationData);

      const request = backend.expectOne('api/auth/register');
      request.flush((response));
      expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
    });

    it('долже вызвать метод "error" у "ErrorHandlerService" при получении ошибки на "POST" запрос', () => {
      service.register(mockRegistrationData);

      const request = backend.expectOne('api/auth/register');
      request.flush(data, mockErrorResponse);

      expect(errorHandler.error).toHaveBeenCalled();
    });

  });

});

