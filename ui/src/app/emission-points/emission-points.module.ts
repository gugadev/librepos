import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmissionPointsComponent } from './emission-points.component';
import { EmissionPointService } from './emission-point.service';
import { RouterModule } from '@angular/router';
import { ListModule } from './list/list.module';
import { CreateModule } from './create/create.module';
import { EditModule } from './edit/edit.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListModule,
    CreateModule,
    EditModule
  ],
  declarations: [EmissionPointsComponent],
  providers: [EmissionPointService]
})
export class EmissionPointsModule { }
