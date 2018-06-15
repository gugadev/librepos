import * as moment from 'moment';

export class Aditional {
  cashier: string;
  date: string = moment().format('YYYY-MM-DD');
  time: string = moment().format('hh:mm:ss');
  total: number;
  cash: number;
  change: number;
  turn: string = this.getTurn();
  emissionPoint: string;

  private getTurn(): string {
    const hour = moment().hours();
    if (hour > 6 && hour <= 14) {
      return 'M';
    }
    if (hour > 14 && hour <= 22) {
      return 'T';
    }
    return 'N';
  }
}

