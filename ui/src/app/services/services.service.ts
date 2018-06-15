import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../shared/page.model';
import { ServiceQuery } from './query.model';
import { PagedData } from '../shared/paged-data.model';
import { Service } from './service.model';
import { EmissionPoint } from '../emission-points/emission-point.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url = 'http://127.0.0.1:5000/api/services';

  constructor(private http: HttpClient) { }

  async paginate(page: Page, query: ServiceQuery): Promise<PagedData<Service>> {
    const pagedData = new PagedData<Service>();
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

  public fetch(page: Page, query: ServiceQuery): Promise<any> {
    return new Promise((ok: Function, fail: Function) => {
      const params = new HttpParams()
      .append('isActive', query.isActive)
      .append('emissionPoint', query.emissionPoint + '')
      .append('needPlate', query.needPlate)
      .append('discriminator', query.discriminator);
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
          const services = data.map(record => {
            const service = new Service();
            const epoint = new EmissionPoint();
            service.id = record.id;
            service.code = record.code;
            service.name = record.name;
            service.cost = record.cost;
            service.unitMeasurement = record.unitMeasurement;
            service.needPlate = record.needPlate;
            service.isActive = record.isActive;
            epoint.id = record.emissionPoint.id;
            epoint.name = record.emissionPoint.name;
            epoint.isActive = record.isActive;
            service.emissionPoint = epoint;
            return service;
          });
          ok(services);
        } else {
          fail(errors);
        }
      });
    });
  }

  public find(code: string): Promise<Service> {
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .get(`${this.url}/${code}`, {
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
          const service = new Service();
          service.id = data.id;
          service.name = data.name;
          service.code = data.code;
          service.cost = data.cost;
          service.needPlate = data.needPlate;
          service.unitMeasurement = data.unitMeasurement;
          service.emissionPointId = data.emissionPoint.id;
          service.emissionPoint = data.emissionPoint;
          service.isActive = data.isActive;
          ok(service);
        } else {
          fail(errors);
        }
      }, err => {
        fail(err);
      });
    });
  }

  public create(service: Service): Promise<Service> {
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .post(this.url, service, {
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
          const _service = new Service();
          _service.id = data.id;
          _service.name = data.name;
          _service.code = data.code;
          _service.cost = data.cost;
          _service.needPlate = data.needPlate;
          _service.emissionPoint = data.emissionPoint;
          _service.isActive = data.isActive;
          ok(_service);
        } else {
          fail(errors);
        }
      }, err => {
        fail(err);
      });
    });
  }

  public update(service: Service): Promise<Service> {
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .put(`${this.url}/${service.code}`, service, {
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
          const _service = new Service();
          _service.id = data.id;
          _service.name = data.name;
          _service.code = data.code;
          _service.cost = data.cost;
          _service.needPlate = data.needPlate;
          _service.emissionPoint = data.emissionPoint;
          _service.isActive = data.isActive;
          ok(_service);
        } else {
          fail(errors);
        }
      }, err => {
        fail(err);
      });
    });
  }

  public count(query: ServiceQuery): Promise<number> {
    return new Promise((ok: Function, fail: Function) => {
      const params = new HttpParams()
      .append('isActive', query.isActive)
      .append('emissionPoint', query.emissionPoint + '')
      .append('needPlate', query.needPlate)
      .append('discriminator', query.discriminator);
      this
      .http
      .get(`${this.url}/count`, {
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
}
