import { Service } from '../services/service.model';

export class Detail {
  documentType: string;
  serie: string;
  correlative: number;
  sequential: number;
  service: Service;
  quantity: number;
  amount: number;
  discount: number;
  taxRate: number;
  taxAmount: number;
  igvAffectCode: string;
}
