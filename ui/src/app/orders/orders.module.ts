import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';
import { ServicesService } from '../services/services.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
  ],
  declarations: [OrdersComponent],
  providers: [OrdersService, ServicesService]
})
export class OrdersModule { }
