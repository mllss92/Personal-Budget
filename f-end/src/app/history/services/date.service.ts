import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService {

  date$: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor() { }

  editYear(num: number): void {
    const value = this.date$.value.clone().add(num, 'year');
    this.date$.next(value);
  }

  editMonth(num: number): void {
    const value = this.date$.value.clone().set('month', num);
    this.date$.next(value);
  }
}
