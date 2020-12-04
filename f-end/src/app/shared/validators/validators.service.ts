import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class ValidatorsService {

  constructor() { }

  public custom(regexp: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const key = Object.keys(error)[0];
      const valid = regexp.test(control.value);
      if (!valid) {
        error[key] = true;
        return error;
      } else {
        return null;
      }
    };
  }

  public passwordMatch(password: AbstractControl, confirmPassword: AbstractControl, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const key = Object.keys(error)[0];
      const valid = password.value === confirmPassword.value;
      if (!valid) {
        error[key] = true;
        return error;
      } else {
        return null;
      }
    };
  }

  public symbol(regexp: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const key = Object.keys(error)[0];
      const valid = regexp.test(control.value);
      if (valid) {
        error[key] = true;
        return error;
      } else {
        return null;
      }
    };
  }
}
