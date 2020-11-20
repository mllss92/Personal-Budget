import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AuthorizedUser } from 'src/app/shared/interfaces/authorized-user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  authorizedUser: AuthorizedUser = {
    fullName: JSON.parse(localStorage.getItem('fullName')) || '',
    _id: JSON.parse(localStorage.getItem('_id')) || '',
    token: JSON.parse(localStorage.getItem('token')) || '',
    balance: JSON.parse(localStorage.getItem('balance')) || 0,
    monthIncome: JSON.parse(localStorage.getItem('monthIncome')) || [],
    avalibleToDistribute: JSON.parse(localStorage.getItem('avalibleToDistribute')) || 0,
    savings: JSON.parse(localStorage.getItem('savings')) || [],
    spends: JSON.parse(localStorage.getItem('spends')) || [],
    login: JSON.parse(localStorage.getItem('login')) || false
  };

  month = moment().format('MM.YYYY');

  savingCardId: string;

  constructor() { }
}
