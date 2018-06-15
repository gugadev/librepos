import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ServicesService } from '../services.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmissionPointService } from '../../emission-points/emission-point.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [ListComponent],
  providers: [ServicesService, EmissionPointService]
})
export class ListModule { }
