import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = 'http://127.0.0.1:5000/api/users';

  constructor(private http: HttpClient) { }

  uploadPhoto(username: string, photo: String): Promise<Boolean> {
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .patch(`${this.url}/${username}/photo`, { photo }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe(res => {
        const {
          status,
          data,
          errors
        }: any = res;

        if (status === 200) {
          ok(true);
        } else {
          fail(errors);
        }
      });
    });
  }
}
