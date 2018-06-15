import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { ReportQuery } from './report-query';
import { Page } from '../shared/page.model';
import { Report } from './report.model';
import { PagedData } from '../shared/paged-data.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  public export(query: ReportQuery): Promise<string> {
    const params =
      new HttpParams()
      .append('from', query.from)
      .append('to', query.to)
      .append('emissionPoint', query.emissionPoint as any)
      .append('user', query.user as any);
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .get('http://localhost:5000/api/reports/user', {
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
      }, err => { fail(err); });
    });
  }

  public paginate(page: Page, query: ReportQuery): Promise<PagedData<Report>> {
    const params =
      new HttpParams()
      .append('from', query.from)
      .append('to', query.to)
      .append('emissionPoint', query.emissionPoint as any)
      .append('user', query.user as any)
      .append('page', page.pageNumber + 1 as any)
      .append('size', page.size as any);
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .get('http://localhost:5000/api/reports/user/raw', {
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
          const pagedData = new PagedData<Report>();
          page.totalElements = data.length;
          page.totalPages = page.totalElements / page.size;
          pagedData.page = page;
          pagedData.data = data.map(row => {
            const report = new Report();
            report.quantity = row.quantity;
            report.service = row.service;
            report.amount = row.amount;
            return report;
          });
          ok(pagedData);
        } else {
          fail(errors);
        }
      }, err => { fail(err); });
    });
  }
}
