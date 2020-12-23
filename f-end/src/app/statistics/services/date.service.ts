import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class DateService {

  date$: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor() { }

  editMonth(num: number): void {
    const value = this.date$.value.clone().add(num, 'month');
    this.date$.next(value);
  }
}
