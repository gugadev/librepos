/**
 * This service register orders and call the background deamon
 * for print the corresponding bill for this.
 */
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private url = 'http://127.0.0.1:5000/api/orders';

  constructor(private http: HttpClient) { }

  public create(orders: Order[]): Promise<Order[]> {
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .post(this.url, { data: orders }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe(res => {
        const {
          status,
          data,
          errors
        }: any = res;
        ok(data);
      }, err => fail(err));
    });
  }
}
