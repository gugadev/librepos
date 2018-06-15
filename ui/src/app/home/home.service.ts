import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = 'http://127.0.0.1:5000/api/users/self';

  constructor(
    private router: Router,
    private http: HttpClient) { }

  async checkAuth(): Promise<any> {
    return new Promise((ok, fail) => {
      this
      .http
      .get(this.url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe(res => {
        const { data }: any = res;

        const user = new User();
        user.id = data.id;
        user.name = data.name;
        user.username = data.username;
        user.email = data.email;
        user.photo = data.photo;
        user.isActive = data.isActive;
        user.role = data.role;
        user.emissionPoint = data.emissionPoint;
        // save user info in storage
        localStorage.setItem('userId', user.id as any);
        localStorage.setItem('role', user.role.id);
        localStorage.setItem('emissionPoint', user.emissionPoint.id);
        ok(user);
      }, err => {
        // console.warn(err);
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');
        }
      });
    });
    // const request = this.http.get(this.url, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   }
    // }).toPromise();
    // try {
    //   const {
    //     status,
    //     data,
    //     errors,
    //   }: any = await request;
    //   if (status === 200) {
    //     return data;
    //   }
    // } catch (e) {
    //   console.log(e);
    //   localStorage.removeItem('token');
    //   this.router.navigateByUrl('/login');
    // }
  }
}
