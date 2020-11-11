import { Injectable } from '@angular/core';

import { AuthorizedUser } from 'src/app/shared/interfaces/authorized-user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  authorizedUser: AuthorizedUser = {
    fullName: localStorage.getItem('user_name') || '',
    _id: localStorage.getItem('_id') || '',
    token: localStorage.getItem('token') || '',
    login: localStorage.getItem('login') === 'true' || false
  };

  constructor() { }
}
