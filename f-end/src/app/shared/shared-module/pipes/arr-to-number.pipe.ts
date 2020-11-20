import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrToNumber'
})
export class ArrToNumberPipe implements PipeTransform {

  transform(value: number[]): number {
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    const sum = value.reduce(reducer);
    return sum;
  }

}
