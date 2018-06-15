import { PipeTransform, Pipe } from '@angular/core';
import * as numeral from 'numeral';

@Pipe({ name: 'currency' })
export class Currency implements PipeTransform {
  transform(value: number) {
    return numeral(value).format('0,0.00');
  }
}
