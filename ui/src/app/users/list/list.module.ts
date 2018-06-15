import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoleService } from '../../shared/role.service';
import { EmissionPointService } from '../../emission-points/emission-point.service';
import { ServicesService } from '../../services/services.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgxDatatableModule,
  ],
  declarations: [ListComponent],
  providers: [ServicesService, RoleService, EmissionPointService]
})
export class ListModule { }
