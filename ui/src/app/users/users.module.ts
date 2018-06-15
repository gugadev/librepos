import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './list/list.module';
import { CreateModule } from './create/create.module';
import { EditModule } from './edit/edit.module';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ListModule,
    CreateModule,
    EditModule,
    RouterModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
