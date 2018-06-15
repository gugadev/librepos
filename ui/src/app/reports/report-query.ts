import { IsNotEmpty } from 'class-validator';
import * as moment from 'moment';

export class ReportQuery {
  @IsNotEmpty({ message: 'Seleccione un punto' })
  emissionPoint = '';
  @IsNotEmpty({ message: 'Seleccione un usuario' })
  user = '';
  from: string = moment().format('YYYY-MM-DD');
  to: string = moment().format('YYYY-MM-DD');

  validate(): boolean {
    return (
      this.emissionPoint !== '' && this.user !== ''
      && this.from !== '' && this.to !== ''
    );
  }
}
