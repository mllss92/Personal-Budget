import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AuthorizedUser } from 'src/app/shared/interfaces/authorized-user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  authorizedUser: AuthorizedUser = {
    name: JSON.parse(localStorage.getItem('name')) || '',
    lastName: JSON.parse(localStorage.getItem('lastName')) || '',
    _id: JSON.parse(localStorage.getItem('_id')) || '',
    token: JSON.parse(localStorage.getItem('token')) || '',
    balance: JSON.parse(localStorage.getItem('balance')) || 0,
    lastLogin: JSON.parse(localStorage.getItem('lastLogin')) || new Date(),
    monthIncome: JSON.parse(localStorage.getItem('monthIncome')) || [0],
    avalibleToDistribute: JSON.parse(localStorage.getItem('avalibleToDistribute')) || 0,
    savings: JSON.parse(localStorage.getItem('savings')) || [],
    spends: JSON.parse(localStorage.getItem('spends')) || [],
    login: JSON.parse(localStorage.getItem('login')) || false,
    expenses: JSON.parse(localStorage.getItem('expenses')) || 0
  };

  month = moment().format('MM.YYYY');

  savingCardId: string;
  savingCardValue: number;
  spendCardId: string;
  spendCardValue: number;

  constructor() { }
}
