import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToasterService } from './../../shared/services/toaster.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { HistoryHttpService } from './history-http.service';
import { HistoryData } from 'src/app/shared/interfaces/history';

describe('HistoryHttpService', () => {
  let service: HistoryHttpService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      providers: [HistoryHttpService, ErrorHandlerService, ToasterService]
    });

    service = TestBed.inject(HistoryHttpService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('метод "getUserHistory" должен сделать "POST" - запрос и в ответ получить массив  из объектов типа "HistoryData"', () => {
    const mockData: HistoryData = {
      type: 'test',
      date: new Date(),
      from: 'test',
      to: 'test',
      value: 12
    };
    const month = '12.2020';
    service.getUserHistory(month).subscribe(
      res => {
        expect(res).toEqual([mockData]);
      }
    );
    const req = backend.expectOne(`api/history/get`);
    req.flush([mockData]);
    expect(req.request.method).toEqual('POST');
    backend.verify();
  });
});
