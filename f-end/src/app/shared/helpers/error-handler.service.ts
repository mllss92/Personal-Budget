import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToasterService } from './../services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toaster: ToasterService,
    private router: Router
  ) { }

  error(err: HttpErrorResponse): void {
    if (err.error === 'Unauthorized') {
      this.toaster.error('Token is expired. Please sign in!');
      this.router.navigate(['auth/login']);
    } else {
      this.toaster.error(err.error.message ? err.error.message : err.message);
    }
  }
}
