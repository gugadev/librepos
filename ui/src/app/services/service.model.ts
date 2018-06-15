import { IsNotEmpty, IsCurrency } from 'class-validator';
import { Model } from '../shared/model';

export class Service extends Model {
  id: number;
  @IsNotEmpty({ message: 'Ingrese un código' })
  code: string;
  @IsNotEmpty({ message: 'Ingrese un nombre' })
  name: string;
  @IsNotEmpty({ message: 'Ingrese un precio' })
  // @IsCurrency()
  @IsNotEmpty()
  cost: number;
  @IsNotEmpty({ message: 'Seleccione una unidad de medida' })
  unitMeasurement = '';
  needPlate = false;
  isActive = true;
  emissionPoint: any = '';
  @IsNotEmpty({ message: 'Seleccione un punto de emisión' })
  emissionPointId = '';

  reset(): void {
    this.id = undefined;
    this.code = '';
    this.name = '';
    this.cost = 0.0;
    this.unitMeasurement = '';
    this.needPlate = false;
    this.isActive = false;
    this.emissionPoint = {};
    this.emissionPointId = '';
  }
}
