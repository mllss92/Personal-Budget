import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToasterService } from './../../shared/services/toaster.service';
import { AuthService } from './../service/auth.service';
import { ValidatorsService } from './../validators/validators.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private router: Router,
    private myValidator: ValidatorsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.myValidator.custom(new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,30}'), { passwordError: '' })]),
      confirmPassword: new FormControl('', [Validators.required, this.myValidator.passwordMatch(this, { passwordMatchError: '' })]),
      name: new FormControl('', [Validators.required, this.myValidator.custom(new RegExp('^[a-zA-Z]{2,}$'), { nameError: '' })]),
      lastName: new FormControl('', [Validators.required, this.myValidator.custom(new RegExp('^[a-zA-Z]{2,}$'), { lastNameError: '' })])
    });
  }

  cancelRegistration(): void {
    this.router.navigate(['auth/login']);
  }

  register(): void {
    if (this.regForm.valid) {
      const value = this.regForm.value;
      delete value.confirmPassword;

      this.authService.register(value);
    }
  }

}
