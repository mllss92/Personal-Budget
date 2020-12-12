import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DataService } from './../services/data.service';
import { ToasterService } from './../services/toaster.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  const dataServiceStub = {
    authorizedUser: {
      login: false
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [
        AuthGuard,
        ToasterService,
        { provide: DataService, useValue: dataServiceStub }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should ...', () => {
    expect(guard).toBeTruthy();
  });

  describe('метод canActivate', () => {
    it('должен вернуть "true" если параметр объекта "DataService.authorizedUser.login" будет в значении "true"', () => {
      const fakeRoute = {} as ActivatedRouteSnapshot;
      const fakeUrl = '/test' as unknown as RouterStateSnapshot;
      const dataService = TestBed.inject(DataService);
      dataService.authorizedUser.login = true;
      const value = guard.canActivate(fakeRoute, fakeUrl);
      expect(value).toBeTrue();
    });

    it('должен вызвать "error" у "ToasterService" и "navigate" у "Router" если "DataService.authorizedUser.login" будет "false"', () => {
      const fakeRoute = {} as ActivatedRouteSnapshot;
      const fakeUrl = '/test' as unknown as RouterStateSnapshot;
      const toaster = TestBed.inject(ToasterService);
      const router = TestBed.inject(Router);
      const dataService = TestBed.inject(DataService);
      dataService.authorizedUser.login = false;
      spyOn(toaster, 'error');
      spyOn(router, 'navigate');
      guard.canActivate(fakeRoute, fakeUrl);

      expect(toaster.error).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});

