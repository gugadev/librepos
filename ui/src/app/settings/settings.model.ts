import { IsPositive, IsNotEmpty, validate } from 'class-validator';

export class Settings {
  @IsPositive()
  emissionPoint = 0;
  @IsNotEmpty()
  documentType: string;
  @IsNotEmpty()
  serie: string;
  @IsNotEmpty()
  issuerName: string;
  @IsNotEmpty()
  issuerRUC: string;
  @IsPositive()
  igvRate = 0.0;

  public validate(): Promise<boolean> {
    return validate(this).then(errors => errors.length === 0);
  }
}
