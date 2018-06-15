import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueriesComponent } from './queries.component';
import { QueriesService } from './queries.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { NgDatepickerModule } from 'ng2-datepicker';
import { FormsModule } from '@angular/forms';
import { EmissionPointService } from '../emission-points/emission-point.service';
import { UserService } from '../users/users.service';
import { NgxDateRangePickerModule } from 'ngx-daterangepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    // NgDatepickerModule
    NgxDateRangePickerModule
  ],
  declarations: [QueriesComponent],
  providers: [QueriesService, EmissionPointService, UserService]
})
export class QueriesModule { }
