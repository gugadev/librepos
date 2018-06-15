import { Document } from './document';
import { Tax } from './tax';
import { Detail } from './detail';

export class Order {
  document: Document;
  tax: Tax;
  detail: Detail;
}
