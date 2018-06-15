import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmissionPoint } from './emission-point.model';
import { Page } from '../shared/page.model';
import { EmissionPointQuery } from './query.model';
import { PagedData } from '../shared/paged-data.model';

@Injectable({
  providedIn: 'root'
})
export class EmissionPointService {
  private url = 'http://127.0.0.1:5000/api/emissionPoints';

  constructor(private http: HttpClient) { }

  async paginate(page: Page, query: EmissionPointQuery): Promise<PagedData<EmissionPoint>> {
    const pagedData = new PagedData<EmissionPoint>();
    try {
      page.totalElements = await this.count(query);
      page.totalPages = page.totalElements / page.size;
      pagedData.page = page;
      pagedData.data = await this.fetch(page, query);
      return pagedData;
    } catch (e) {
      throw e;
    }
  }

  public async fetch(page: Page, query: EmissionPointQuery): Promise<any> {
    return new Promise((ok, fail) => {
      const params = new HttpParams()
        .append('page', (page.pageNumber + 1).toString())
        .append('quantity', page.size.toString())
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
          ok(data);
        } else {
          fail(errors);
        }
      });
    });
  }

  public create(point: EmissionPoint): Promise<any> {
    return new Promise((ok, fail) => {
      this
      .http
      .post(this.url, point, {
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
          const _point = new EmissionPoint();
          _point.id = data.id;
          _point.name = data.name;
          _point.isActive = data.isActive;
          ok(_point);
        } else {
          fail(errors);
        }
      });
    });
  }

  public update(point: EmissionPoint): Promise<any> {
    return new Promise((ok, fail) => {
      this
        .http
        .put(`${this.url}/${point.id}`, point, {
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
            const _point = new EmissionPoint();
            _point.id = data.id;
            _point.name = data.name;
            _point.isActive = data.isActive;
            ok(_point);
          } else {
            fail(errors);
          }
        });
    });
  }

  public find(pk: number): Promise<EmissionPoint> {
    return new Promise((ok, fail) => {
      this
      .http
      .get(`${this.url}/${pk}`, {
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
          const point = new EmissionPoint();
          point.id = data.id;
          point.name = data.name;
          point.isActive = data.isActive;
          ok(point);
        } else {
          fail(errors);
        }
      });
    });
  }

  public async count(query: EmissionPointQuery): Promise<any> {
    return new Promise((ok, fail) => {
      this
      .http
      .get(
        `${this.url}/count?isActive=${query.isActive}`, {
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
