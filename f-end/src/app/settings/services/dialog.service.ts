import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ChangeEmailComponent } from './../change-email/change-email.dialog';
import { ChangeLastNameComponent } from './../change-last-name/change-last-name.dialog';
import { ChangeNameComponent } from './../change-name/change-name.dialog';
import { RegistrationData } from './../../shared/interfaces/registration-data';
import { ChangePasswordComponent } from './../change-password/change-password.dialog';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { SettingsHttpService } from './settings-http.service';
import { PasswordConfirmComponent } from './../password-confirm/password-confirm.dialog';

@Injectable()
export class DialogService {

  changesList: RegistrationData = {
    name: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined
  };
  isChanged = false;

  constructor(
    private dialog: MatDialog,
    private httpService: SettingsHttpService,
    private errorHandler: ErrorHandlerService
  ) { }

  openConfirmPasswordDialog(target: string): void {
    const confirmPasswordDialog = this.dialog.open(PasswordConfirmComponent);
    confirmPasswordDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.httpService.confirmPassword(res).subscribe(
            result => {
              if (result) {
                switch (target) {
                  case 'password': {
                    return this.openChangePasswordDialog();
                  }
                  case 'name': {
                    return this.openChangeNameDialog();
                  }
                  case 'lastName': {
                    return this.openChangeLastNameDialog();
                  }
                  case 'email': {
                    return this.openChangeEmailDialog();
                  }
                }
              }
            },
            err => this.errorHandler.error(err)
          );
        }
      }
    );
  }

  private openChangePasswordDialog(): void {
    const changePasswordDialog = this.dialog.open(ChangePasswordComponent);
    changePasswordDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.changesList.password = res;
          this.isChanged = true;
        }
      }
    );
  }

  private openChangeNameDialog(): void {
    const changeNameDialog = this.dialog.open(ChangeNameComponent, { minWidth: 400 });
    changeNameDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.changesList.name = res[0].toUpperCase() + res.toLowerCase().slice(1);
          this.isChanged = true;
        }
      }
    );
  }

  private openChangeLastNameDialog(): void {
    const changeNameDialog = this.dialog.open(ChangeLastNameComponent, { minWidth: 400 });
    changeNameDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.changesList.lastName = res[0].toUpperCase() + res.toLowerCase().slice(1);
          this.isChanged = true;
        }
      }
    );
  }

  private openChangeEmailDialog(): void {
    const changeNameDialog = this.dialog.open(ChangeEmailComponent, { minWidth: 400 });
    changeNameDialog.afterClosed().subscribe(
      res => {
        if (res) {
          this.changesList.email = res;
          this.isChanged = true;
        }
      }
    );
  }

}
