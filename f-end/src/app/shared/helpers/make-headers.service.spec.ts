import { TestBed } from '@angular/core/testing';

import { DataService } from './../services/data.service';
import { MakeHeadersService } from './make-headers.service';

describe('MakeHeadersService', () => {
  let service: MakeHeadersService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MakeHeadersService,
        { provide: DataService, useValue: { authorizedUser: { token: 'test' } } }
      ]
    });

    service = TestBed.inject(MakeHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('метод makeHeader()', () => {
    it('должен вернуть объект с объектом "headers" у которогу параметр "Authorization" === "DataService.authorizedUser.token"', () => {
      const data = TestBed.inject(DataService);
      service.makeHeader();
      const value = service.makeHeader();
      expect(value).toEqual({ headers: { Authorization: 'test' } });
    });
  });
});
