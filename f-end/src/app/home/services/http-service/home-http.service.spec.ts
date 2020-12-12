import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToasterService } from './../../../shared/services/toaster.service';
import { ErrorHandlerService } from './../../../shared/helpers/error-handler.service';
import { HomeHttpService } from './home-http.service';
import { of } from 'rxjs';

describe('HomeHttpService', () => {
  let service: HomeHttpService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      providers: [HomeHttpService, ErrorHandlerService, ToasterService]
    });

    service = TestBed.inject(HomeHttpService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
