import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { RoleService } from '../../shared/role.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmissionPointService } from '../../emission-points/emission-point.service';
import { RouterModule } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  declarations: [CreateComponent],
  providers: [ServicesService, RoleService, EmissionPointService]
})
export class CreateModule { }
