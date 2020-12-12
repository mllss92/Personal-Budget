import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToasterService } from './../../shared/services/toaster.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { StatisticsHttpService } from './statistics-http.service';

describe('StatisticsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      providers: [StatisticsHttpService, ErrorHandlerService, ToasterService]
    });
  });

  it('should be created', inject([StatisticsHttpService], (service: StatisticsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
