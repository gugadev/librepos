import * as moment from 'moment';

export class DocumentQuery {
  from: string = moment().format('YYYY-MM-DD');
  to: string = moment().format('YYYY-MM-DD');
  state = '';
  plate = '';
  emissionPoint: any = '';
  user: any = '';
  serie = '';
  correlative: any = '';
}
