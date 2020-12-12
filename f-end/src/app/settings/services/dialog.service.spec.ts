import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { PasswordConfirmComponent } from './../password-confirm/password-confirm.dialog';
import { ToasterService } from './../../shared/services/toaster.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { SettingsHttpService } from './settings-http.service';
import { DialogService } from './dialog.service';
import { of } from 'rxjs';

describe('DialogService', () => {
  let service: DialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, MatSnackBarModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [DialogService, SettingsHttpService, ErrorHandlerService, ToasterService]
    });

    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
