import { IsNotEmpty, validate } from 'class-validator';
import { Model } from '../shared/model';

export class EmissionPoint extends Model {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  isActive = ''; // se convierte en boolean en el backend

  reset(): void {
    this.id = undefined;
    this.name = '';
    this.isActive = '';
  }
}
