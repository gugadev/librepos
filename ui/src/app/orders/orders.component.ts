import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service.model';
import { Metadata } from './metadata.model';
import { Order } from './order.model';
import { ServicesService } from '../services/services.service';
import { Page } from '../shared/page.model';
import { ServiceQuery } from '../services/query.model';
import { Aditional } from './aditional.model';
import { OrdersService } from './orders.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private order: Order;
  private service: Service;
  private metadata: Metadata;
  private aditional: Aditional;
  private services: Service[] = [];
  private quantity = 1; // number of tickets

  constructor(
    private _service: OrdersService,
    private sService: ServicesService,
    private _snotify: SnotifyService) { }

  private createOrder() {
    const orders: Order[] = [];
    // generate the same number of orders
    // than filled in "quantity" form field.
    for (let i = 0; i < this.quantity; i++) {
      const order = new Order();
      const aditional = new Aditional();
      order.total = this.order.total;
      order.plate = this.order.plate;
      order.service = this.order.service;
      order.metadata = new Metadata();
      aditional.cashier = 'user name';
      aditional.emissionPoint = 'emission point';
      aditional.cash = this.aditional.cash;
      aditional.change = this.aditional.change;
      aditional.total = this.order.total;
      order.aditional = aditional;
      orders.push(order);
    }

    // recursive method that iterate over
    // al orders and register one by one
    // const processOrders = (index = 0) => {
    //   const _order = orders[index];
    //   // if _order is undefined, that means
    //   // there is no more orders to send
    //   if (!_order) {
    //     this.order.reset();
    //     this
    //     ._snotify
    //     .success('Venta registrada', null, {
    //       position: SnotifyPosition.rightBottom,
    //       pauseOnHover: true,
    //       timeout: 3000
    //     });
    //     return;
    //   }
    //   this
    //   ._service
    //   .create(_order)
    //   .then((data: Order) => {
    //     // console.log(data);
    //     processOrders(index + 1);
    //   })
    //   .catch(err => console.warn(err));
    // };
    // processOrders(0);
    // fill aditional data
    // this.aditional.cashier = 'user name';
    // this.aditional.emissionPoint = 'emission point';
    // this.order.metadata = this.metadata;
    // this.order.aditional = this.aditional;
    this
    ._service
    .create(orders)
    .then((data: Order[]) => {
      console.log(data);
      this.order.reset();
      this.service = new Service();
      this.aditional = new Aditional();
      this
      ._snotify
      .success('Venta registrada', null, {
        position: SnotifyPosition.rightTop,
        pauseOnHover: true,
        timeout: 3000
      });
    })
    .catch(err => console.warn(err));
  }

  private preCalculate(): void {
    this.order.total = this.quantity * this.service.cost;
    this.aditional.cash = this.order.total;
    this.calculate(null);
  }

  private calculate(e): void {
    if (e) {
      this.aditional.cash = Number(e.target.value);
    }
    this.aditional.change = this.aditional.cash - this.order.total;
  }

  private findService(): void {
    if (!this.order.service) { return; }
    this
    .sService
    .find(this.order.service)
    .then((data: Service) => {
      this.service = data;
      this.preCalculate();
      // console.log(this.service);
    })
    .catch(err => {
      console.warn(err);
    });
  }

  private getServices(): void {
    const page: Page = new Page();
    const query: ServiceQuery = new ServiceQuery();
    page.pageNumber = 0;
    page.size = 500;
    this
    .sService
    .fetch(page, query)
    .then((data: Service[]) => {
      this.services = data;
    })
    .catch(e => {
      console.warn(e);
    });
  }

  private getMetadata(): void {
    // obtiene: [tipo de documento] [serie] [correlativo]
  }

  ngOnInit() {
    this.order = new Order();
    this.service = new Service();
    this.aditional = new Aditional();
    this.metadata = new Metadata();
    this.getServices();
  }

}
