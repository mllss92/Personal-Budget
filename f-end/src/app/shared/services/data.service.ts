import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AuthorizedUser } from 'src/app/shared/interfaces/authorized-user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  authorizedUser: AuthorizedUser = {
    fullName: localStorage.getItem('user_name') || '',
    _id: localStorage.getItem('_id') || '',
    token: localStorage.getItem('token') || '',
    login: localStorage.getItem('login') === 'true' || false,
    balance: +localStorage.getItem('balance') || 0,
    savings: JSON.parse(localStorage.getItem('savings')) || []
  };

  month = moment().format('MM.YYYY');

  monthIncome: number;
  avalibleToDistribute: number;

  savingCardId: string;

  constructor() { }
}
