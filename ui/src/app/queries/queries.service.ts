import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Page } from '../shared/page.model';
import { DocumentQuery } from './document-query';
import { Document } from './document';
import { PagedData } from '../shared/paged-data.model';
import { Environment } from '../shared/utils/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
  private url = `${Environment.get().apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  public async paginate(page: Page, query: DocumentQuery): Promise<PagedData<Document>> {
    const pagedData = new PagedData<Document>();
    page.totalElements = await this.count(query);
    page.totalPages = page.totalElements / page.size;
    pagedData.page = page;
    pagedData.data = await this.fetch(page, query);
    return pagedData;
  }

  public fetch(page: Page, query: DocumentQuery): Promise<Document[]> {
    const params =
      new HttpParams()
      .append('from', query.from)
      .append('to', query.to)
      .append('plate', query.plate)
      .append('user', query.user as any)
      .append('serie', query.serie)
      .append('correlative', query.correlative as any)
      .append('state', query.state)
      .append('emissionPoint', query.emissionPoint as any);
    return new Promise((ok: Function, fail: Function) => {
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
          errors,
        }: any = res;

        if (status === 200) {
          const documents: Document[] = data.map(record => ({
            document: record.document,
            tax: record.tax,
            detail: record.detail
          }));
          ok(documents);
        } else {
          fail(errors);
        }
      }, (err: Error) => {
        console.warn(err.stack);
        fail([err.message]);
      });
    });
  }

  public export(query: DocumentQuery): Promise<string> {
    const params =
      new HttpParams()
      .append('from', query.from)
      .append('to', query.to)
      .append('plate', query.plate)
      .append('state', query.state)
      .append('user', query.user as any)
      .append('serie', query.serie)
      .append('correlative', query.correlative as any)
      .append('emissionPoint', query.emissionPoint as any);
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .get(`${Environment.get().apiUrl}/reports/general`, {
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
      }, err => {
        fail(err);
      });
    });
  }

  private count(query: DocumentQuery): Promise<number> {
    const params =
      new HttpParams()
      .append('from', query.from)
      .append('to', query.to)
      .append('plate', query.plate)
      .append('state', query.state)
      .append('user', query.user as any)
      .append('serie', query.serie)
      .append('correlative', query.correlative as any)
      .append('emissionPoint', query.emissionPoint as any);
    return new Promise((ok, fail) => {
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
