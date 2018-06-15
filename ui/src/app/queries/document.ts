import { EmissionPoint } from '../emission-points/emission-point.model';
import { User } from '../users/user.model';

export class Document {
  type: string;
  serie: string;
  correlative: number;
  emissionPoint: EmissionPoint;
  user: User;
  issuerType: string;
  issuerNumber: string;
  issuerName: string;
  currency: string;
  netAmount: number;
  totalAmount: number;
  igvTotalAmount: number;
  creationDate: Date;
  emissionDate: Date;
  emissionState: string;
  creator: string;
  plate: string;
  operationId: string;
}
