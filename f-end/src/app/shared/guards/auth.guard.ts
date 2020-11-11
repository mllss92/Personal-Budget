import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ToasterService } from './../services/toaster.service';
import { DataService } from './../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private dataService: DataService,
    private router: Router,
    private toaster: ToasterService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.dataService.authorizedUser.login) {
      return true;
    }
    this.toaster.error('Unauthorized. Please sign in!');
    this.router.navigate(['auth/login']);
  }
}
