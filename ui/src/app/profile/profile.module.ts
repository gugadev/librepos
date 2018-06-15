import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../users/users.service';
import { ProfileService } from './profile.service';
import { SnotifyService } from 'ng-snotify';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [ProfileComponent],
  providers: [UserService, SnotifyService, ProfileService]
})
export class ProfileModule { }
