import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ToasterService } from './../../shared/services/toaster.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { SettingsHttpService } from './../services/settings-http.service';
import { ValidatorsService } from './../../shared/validators/validators.service';
import { CheckPasswordService } from './check-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.dialog.html',
  styleUrls: ['./change-password.dialog.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog,
    private passwordService: CheckPasswordService,
    private validators: ValidatorsService,
    private httpService: SettingsHttpService,
    private errorHandler: ErrorHandlerService,
    private toaster: ToasterService
  ) { }

  form: FormGroup;
  passwordInput: Subscription;

  progress: number;

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(
        null,
        [
          Validators.required,
          this.validators.custom(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%^&_+=)(-,`.<>\/;:|№])(?=\S+$).{6,}$/, { passwordError: '' }),
          this.validators.symbol(/(?=.*[?*@])/, { symbolError: '' })
        ]
      ),
      confirmPassword: new FormControl(null)
    });
    this.form.get('confirmPassword').setValidators([
      Validators.required,
      this.validators.passwordMatch(this.form.get('password'), this.form.get('confirmPassword'), { passwordMatch: '' })
    ]);

    this.checkPasswordStrength();
  }
  ngOnDestroy(): void {
    this.passwordInput.unsubscribe();
  }

  checkPasswordStrength(): void {
    const input: HTMLInputElement = document.querySelector('.password');
    this.passwordInput = this.passwordService.checkPassword(input).subscribe(
      res => this.progress = res
    );
  }

}
