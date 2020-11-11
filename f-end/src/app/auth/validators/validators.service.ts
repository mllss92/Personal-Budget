import { RegistrationComponent } from './../registration/registration.component';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class ValidatorsService {

  constructor() { }

  public custom(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const key = Object.keys(error)[0];
      const valid = regex.test(control.value);
      if (!valid) {
        error[key] = true;
        return error;
      } else {
        return null;
      }
    };
  }

  public passwordMatch(component: RegistrationComponent, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const key = Object.keys(error)[0];
      const valid = component.regForm.value.password === component.regForm.controls.confirmPassword.value;
      if (!valid) {
        error[key] = true;
        return error;
      } else {
        return null;
      }
    };
  }
}
