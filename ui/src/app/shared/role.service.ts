import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = 'http://127.0.0.1:5000/api/roles';

  constructor(private http: HttpClient) { }

  getAll(): Promise<Array<Role>> {
    return new Promise((ok, fail) => {
      this
      .http.get(this.url, {
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
          ok(data);
        } else {
          fail(errors);
        }
      });
    });
  }
}
