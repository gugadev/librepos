import { Metadata } from './metadata.model';
import { IsNotEmpty, MinLength, IsNumber } from 'class-validator';
import { Aditional } from './aditional.model';

export class Order {
  @IsNotEmpty({ message: 'Seleccione un servicio' })
  service: any = '';
  @IsNotEmpty({ message: 'Ingrese un código' })
  code: string;
  @IsNotEmpty({ message: 'Ingrese un costo' })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Ingrese un costo numérico' })
  cost: number;
  @IsNotEmpty({ message: 'Ingrese una cantidad' })
  @MinLength(1, { message: 'Ingrese al menos una unidad' })
  quantity = 1;
  @IsNotEmpty({ message: 'Ingrese un monto total' })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Ingrese un costo numérico' })
  total: number;
  metadata: Metadata;
  aditional: Aditional;
  @IsNotEmpty({ message: 'Seleccione una moneda' })
  currency = 'PEN';
  plate: string;

  reset(): void {
    this.service = '';
    this.code = null;
    this.cost = null;
    this.quantity = 1;
    this.total = null;
    this.plate = null;
  }
}
