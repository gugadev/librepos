import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { HttpClientModule } from '@angular/common/http';
// import { NgDatepickerModule } from 'ng2-datepicker';
import { NgxDateRangePickerModule } from 'ngx-daterangepicker';
import { ReportsService } from './reports.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDatatableModule,
    // NgDatepickerModule,
    NgxDateRangePickerModule
  ],
  declarations: [ReportsComponent],
  providers: [ReportsService]
})
export class ReportsModule { }
