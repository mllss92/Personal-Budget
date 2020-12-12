import { DataService } from './../services/data.service';
import { AuthorizedUser } from './../interfaces/authorized-user';
import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  // tslint:disable-next-line:prefer-const
  let authorizedUser: AuthorizedUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        { provided: DataService, useValue: authorizedUser }
      ]
    });

    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('метод updateUserInfo()', () => {
    it('должен присвоить значения из объекта аргумента в "DataService.authorizedUser" и вызвать "localStorage.setItem" с каждым', () => {
      const dataService = TestBed.inject(DataService);
      const mockObj = { name: 'test', balance: 25 };
      spyOn(localStorage, 'setItem');
      service.updateUserInfo(mockObj);

      expect(dataService.authorizedUser.name).toEqual(mockObj.name);
      expect(dataService.authorizedUser.balance).toEqual(mockObj.balance);
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });
});
