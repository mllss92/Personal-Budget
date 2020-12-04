import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CheckPasswordService {

  constructor() { }

  checkPassword(element: HTMLInputElement): Observable<number> {
    const lowerCase: RegExp = /(?=.*[a-z])/;
    const upperCase: RegExp = /(?=.*[A-Z])/;
    const num: RegExp = /(?=.*[0-9])/;
    const symbols: RegExp = /(?=.*[!#$%^&_+=)(-,`.<>\/;:|№])/;

    return fromEvent(element, 'input').pipe(
      map(
        elem => {
          const value = (elem.target as HTMLInputElement).value;
          switch (true || false) {
            default: {
              return 0;
            }
            case lowerCase.test(value) && upperCase.test(value) && num.test(value) && symbols.test(value) && value.length > 7: {
              return 100;
            }

            case upperCase.test(value) && num.test(value) && symbols.test(value) && value.length > 7: {
              return 70;
            }
            case lowerCase.test(value) && num.test(value) && symbols.test(value) && value.length > 7: {
              return 70;
            }
            case lowerCase.test(value) && upperCase.test(value) && symbols.test(value) && value.length > 7: {
              return 70;
            }
            case lowerCase.test(value) && upperCase.test(value) && num.test(value) && value.length > 7: {
              return 70;
            }

            case upperCase.test(value) && num.test(value) && symbols.test(value) && value.length > 7: {
              return 50;
            }
            case lowerCase.test(value) && num.test(value) && symbols.test(value): {
              return 50;
            }
            case lowerCase.test(value) && upperCase.test(value) && symbols.test(value): {
              return 50;
            }
            case lowerCase.test(value) && upperCase.test(value) && num.test(value): {
              return 50;
            }

            case num.test(value) && symbols.test(value) && value.length > 5: {
              return 30;
            }
            case num.test(value) && upperCase.test(value) && value.length > 5: {
              return 30;
            }
            case lowerCase.test(value) && num.test(value) && value.length > 5: {
              return 30;
            }
            case lowerCase.test(value) && symbols.test(value) && value.length > 5: {
              return 30;
            }
            case symbols.test(value) && upperCase.test(value) && value.length > 5: {
              return 30;
            }
            case lowerCase.test(value) && upperCase.test(value) && value.length > 5: {
              return 30;
            }
            case num.test(value) && symbols.test(value): {
              return 20;
            }
            case num.test(value) && upperCase.test(value): {
              return 20;
            }
            case lowerCase.test(value) && num.test(value): {
              return 20;
            }
            case lowerCase.test(value) && symbols.test(value): {
              return 20;
            }
            case symbols.test(value) && upperCase.test(value): {
              return 20;
            }
            case lowerCase.test(value) && upperCase.test(value): {
              return 20;
            }
            case lowerCase.test(value): {
              return 10;
            }
            case upperCase.test(value): {
              return 10;
            }
            case num.test(value): {
              return 10;
            }
            case symbols.test(value): {
              return 10;
            }
          }
        }
      )
    );
  }
}
