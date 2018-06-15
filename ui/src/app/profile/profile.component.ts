import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { UserService } from '../users/users.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user: User;
  private username: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snotify: SnotifyService,
    private _profileService: ProfileService,
    private _userService: UserService) { }

  update(): void {
    this
    ._userService
    .update(this.user)
    .then((data: User) => {
      this.snotify.success('Perfil actualizado', null, {
        showProgressBar: true,
        closeOnClick: true,
        position: SnotifyPosition.rightTop,
        timeout: 3500,
      });
    })
    .catch(err => {
      console.warn(err);
    });
  }

  updatePhoto(files): void {
    const file: File = files[0];
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      const b64str = reader.result;
      this.user.photo = b64str;
      this
      ._profileService
      .uploadPhoto(this.username, b64str)
      .then(() => {
        this.snotify.info('Foto actualizada', null, {
          showProgressBar: true,
          closeOnClick: true,
          position: SnotifyPosition.rightTop,
          timeout: 3500,
        });
      })
      .catch(err => {
        console.warn(err);
      });
    };
    reader.readAsDataURL(file);
  }

  find(username: string): void {
    this
    ._userService
    .find(username)
    .then((data: User) => {
      this.user = data;
    })
    .catch(err => console.warn(err));
  }

  ngOnInit() {
    this.user = new User();
    this
    .activatedRoute
    .params
    .subscribe(res => {
      this.username = res.username;
      this.find(this.username);
    }, err => {
      console.warn(err);
    });
  }

}
