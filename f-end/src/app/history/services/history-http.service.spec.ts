import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToasterService } from './../../shared/services/toaster.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { HistoryHttpService } from './history-http.service';

describe('HistoryHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      providers: [HistoryHttpService, ErrorHandlerService, ToasterService]
    });
  });

  it('should be created', inject([HistoryHttpService], (service: HistoryHttpService) => {
    expect(service).toBeTruthy();
  }));
});
