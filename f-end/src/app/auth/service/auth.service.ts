import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from './../../shared/helpers/local-storage.service';
import { DataService } from '../../shared/services/data.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { LoginData } from './../../shared/interfaces/login-data';
import { RegistrationData } from './../../shared/interfaces/registration-data';
import { AuthorizedUser } from 'src/app/shared/interfaces/authorized-user';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private toaster: ToasterService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private dataService: DataService,
    private localStorageService: LocalStorageService
  ) { }

  login(data: LoginData): void {
    const reqValue = {
      email: data.email,
      password: data.password,
      month: this.dataService.month
    };
    this.http.post('http://localhost:3000/api/auth/login', reqValue).subscribe(
      (res: AuthorizedUser) => {
        this.localStorageService.updateUserInfo(res);

        this.toaster.success(`Welcome ${res.fullName}!`);
        this.router.navigate(['home']);
      },
      err => {
        this.errorHandler.error(err);
      }
    );
  }

  register(data: RegistrationData): void {
    this.http.post('http://localhost:3000/api/auth/register', data).subscribe(
      res => {
        if (res) {
          this.toaster.success('User has been registered successfully! You can try to login now!');
          this.router.navigate(['auth/login']);
        }
      },
      err => {
        this.errorHandler.error(err);
      }
    );
  }
}
