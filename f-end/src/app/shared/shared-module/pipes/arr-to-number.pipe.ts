import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrToNumber'
})
export class ArrToNumberPipe implements PipeTransform {

  transform(value: number[]): number {
    return value.reduce((accaccumulator, currentValue) => accaccumulator + currentValue);
  }

}
