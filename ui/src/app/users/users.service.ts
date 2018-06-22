import { Injectable } from '@angular/core';
import { Page } from '../shared/page.model';
import { Observable } from 'rxjs';
import { PagedData } from '../shared/paged-data.model';
import { User } from './user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserQuery } from './query.model';
import { Environment } from '../shared/utils/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${Environment.get().apiUrl}/users`;

  constructor(private http: HttpClient) {}

  public async paginate(page: Page, query: UserQuery): Promise<PagedData<User>> {
    const pagedData = new PagedData<User>();
    page.totalElements = await this.count(query);
    page.totalPages = page.totalElements / page.size;
    pagedData.page = page;
    pagedData.data = await this.fetch(page, query);
    return pagedData;
  }

  public async fetch(page: Page, query: UserQuery): Promise<any> {
    return new Promise((ok, fail) => {
      const params = new HttpParams()
      .append('quantity', page.size.toString())
      .append('page', (page.pageNumber + 1).toString())
      .append('role', query.role.toString())
      .append('emissionPoint', query.emissionPoint.toString())
      .append('isActive', query.isActive);

      this
      .http
      .get(this.url, {
        params,
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
          const users: Array<User> = data.map(record => {
            const user: User = new User();
            user.id = record.id;
            user.username = record.username;
            user.name = record.name;
            user.email = record.email;
            user.photo = record.photo;
            user.role = record.role;
            user.isActive = record.isActive;
            user.roleId = record.roleId;
            user.emissionPoint = record.emissionPoint;
            user.emissionPointId = record.emissionPointId;
            user.turnId = record.turn.code;
            return user;
          });
          ok(users);
        } else {
          fail(errors);
        }
      });
    });
  }

  find(username: string): Promise<User> {
    return new Promise((ok, fail) => {
      this
      .http
      .get(`${this.url}/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe(res => {
        const {
          status,
          data,
          errors,
        }: any = res;
        if (status === 200) {
          const user = new User();
          user.id = data.id;
          user.name = data.name;
          user.photo = data.photo;
          user.username = data.username;
          user.email = data.email;
          user.isActive = data.isActive;
          user.role = data.role.id;
          user.roleId = data.role.id;
          user.emissionPoint = data.emissionPoint;
          user.emissionPointId = data.emissionPoint.id;
          user.turnId = data.turn.code;

          ok(user);
        } else {
          fail(errors);
        }
      });
    });
  }

  create(model: User): Promise<User> {
    return new Promise((ok, fail) => {
      this
      .http
      .post(`${Environment.get()}/auth/register`, model, {
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
          const user = new User();
          user.id = data.id;
          user.name = data.name;
          user.username = data.username;
          user.email = data.email;
          user.photo = data.photo;
          user.role = data.role;
          user.emissionPoint = data.emissionPoint;
          user.turn = data.turn;

          ok(user);
        } else {
          fail(errors);
        }
      });
    });
  }

  update(user: User): Promise<User> {
    return new Promise((ok, fail) => {
      this
        .http
        .put(`${this.url}/${user.username}`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .subscribe(res => {
          const {
            status,
            data,
            errors,
          }: any = res;
          if (status === 200) {
            ok(data);
          } else {
            fail(errors);
          }
        });
    });
  }

  private count(query: UserQuery): Promise<number> {
    return new Promise((ok, fail) => {
      const params = new HttpParams()
      .append('role', query.role.toString())
      .append('emissionPoint', query.emissionPoint.toString())
      .append('isActive', query.isActive);

      this
      .http
      .get(`${this.url}/count`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe((res: any) => {
        ok(res.data);
      });
    });
  }
}
