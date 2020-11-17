import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {

  buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '.', '+'];

  constructor() { }

  calcAction(control: FormControl): void {
    const value: string = (event.target as HTMLButtonElement).textContent;
    control.markAsDirty();
    if (value === 'C') {
      this.clearCalcDisplay(control);
      return;
    }
    if (value === '=') {
      if (control.value) {
        this.calculate(control);
        return;
      }
      return;
    }
    control.setValue(control.value + value);
  }

  clearCalcDisplay(control: FormControl): void {
    control.setValue('');
  }

  calculate(control: FormControl): void {
    const value = this.parseValue(control);
    const sum = this.calculateSum(value);
    control.setValue(sum);
  }

  parseValue(control: FormControl): string[] {
    const value = control.value.split('');
    let num = '';
    const result = [];
    value.forEach(elem => {
      if (isNaN(elem) && elem !== '.') {
        result.push(num);
        num = '';
        result.push(elem);
        return;
      }
      num += elem;
    });
    if (num) {
      result.push(num);
    }
    return result;
  }

  calculateSum(arr: string[]): string {
    if (arr.includes('*') || arr.includes('/')) {
      arr.forEach(el => {
        if (el === '*' || el === '/') {
          const index = arr.indexOf(el);
          if (el === '*') {
            const result = (+arr[index - 1] * +arr[index + 1]).toString();
            arr.splice(index - 1, 3, result);
          } else {
            const result = (+arr[index - 1] / +arr[index + 1]).toString();
            arr.splice(index - 1, 3, result);
          }
        }
      });
      this.calculateSum(arr);
    }
    if (arr.includes('+') || arr.includes('-')) {
      arr.forEach(el => {
        if (el === '+' || el === '-') {
          const index = arr.indexOf(el);
          if (el === '+') {
            const result = (+arr[index - 1] + +arr[index + 1]).toString();
            arr.splice(index - 1, 3, result);
          } else {
            const result = (+arr[index - 1] - +arr[index + 1]).toString();
            arr.splice(index - 1, 3, result);
          }
        }
      });
      this.calculateSum(arr);
    }
    if (arr.length === 1) {
      return arr[0];
    }
  }
}
