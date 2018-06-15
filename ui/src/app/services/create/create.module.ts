import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create.component';
import { RouterModule } from '@angular/router';
import { ServicesService } from '../services.service';
import { EmissionPointService } from '../../emission-points/emission-point.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [CreateComponent],
  providers: [ServicesService, EmissionPointService]
})
export class CreateModule { }
