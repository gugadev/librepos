import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private auth: any = {};
  private errors: Array<string> = [];
  private isFetching: boolean;

  constructor(
    private router: Router,
    private service: LoginService) { }

  public login(): void {
    this.isFetching = true;
    this
    .service
    .login(this.auth)
    .then(res => {
      if (res.status !== 200) {
        this.errors = res.errors;
      } else {
        // go to home
        localStorage.setItem('token', res.data);
        this.router.navigateByUrl('/');
      }
    })
    .catch(e => {
      this.errors.push(e.message);
    })
    .then(() => this.isFetching = false);
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/');
    }
  }

}
