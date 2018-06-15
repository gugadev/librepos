import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [EditComponent],
  providers: [ServicesService]
})
export class EditModule { }
