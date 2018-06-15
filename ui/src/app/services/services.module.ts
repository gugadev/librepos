import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListModule } from './list/list.module';
import { EditModule } from './edit/edit.module';
import { CreateModule } from './create/create.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListModule,
    CreateModule,
    EditModule
  ],
  declarations: [ServicesComponent]
})
export class ServicesModule { }
