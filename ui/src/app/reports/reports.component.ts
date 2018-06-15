import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { Page } from '../shared/page.model';
import { ReportQuery } from './report-query';
import { EmissionPoint } from '../emission-points/emission-point.model';
import { DatepickerOptions } from 'ng2-datepicker';
import { ReportsService } from './reports.service';
import { EmissionPointService } from '../emission-points/emission-point.service';
import { UserService } from '../users/users.service';
import { EmissionPointQuery } from '../emission-points/query.model';
import { UserQuery } from '../users/query.model';
import { User } from '../users/user.model';
import { Base64 } from '../shared/utils/base64';
import { Document } from '../queries/document';
import { PagedData } from '../shared/paged-data.model';
import { Report } from './report.model';
import { NgxDateRangePickerOptions } from 'ngx-daterangepicker';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  private page: Page = new Page();
  private query: ReportQuery = new ReportQuery();
  private rows: Report[] = [];
  private columns: any[] = [];
  private isFetching: Boolean = false;
  private emissionPoints: EmissionPoint[] = [];
  private users: User[] = [];
  private datepickerOptions: NgxDateRangePickerOptions;
  private role: number; // role of the user logged
  @ViewChild('currencyTpl') private currencyTpl: TemplateRef<any>;
  private date; // date that is binded to range datepicker
  private isValidSearch: Boolean = false;

  constructor(
    private _service: ReportsService,
    private _emissionPointService: EmissionPointService,
    private _userService: UserService
  ) {
    this.page = new Page();
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  private export() {
    this
    ._service
    .export(this.query)
    .then((base64: string) => {
      const blob: any = Base64.ToBlob(base64, 'application/vnd.ms-excel', undefined);
      const file = new File([blob], 'reporte-usuario.xlsx', { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(file);
    })
    .catch(err => {
      console.warn(err);
    });
  }

  private validate(): void {
    this.isValidSearch = this.query.validate();
  }

  private setDatepickerOptions(): void {
    this.datepickerOptions = {
      theme: 'default',
      labels: ['Inicio', 'Fin'],
      dateFormat: 'DD/MM/YYYY',
      outputFormat: 'YYYY/MM/DD',
      outputType: 'object',
      locale: 'es',
      startOfWeek: 0,
      menu: [
        { alias: 'td', text: 'Hoy', operation: '0d' },
        { alias: 'tm', text: 'Este mes', operation: '0m'} ,
        { alias: 'lm', text: 'Mes pasado', operation: '-1m'} ,
        { alias: 'tw', text: 'Esta semana', operation: '0w'} ,
        { alias: 'lw', text: 'Semana pasada', operation: '-1w'} ,
        { alias: 'ty', text: 'Este año', operation: '0y'} ,
        { alias: 'ly', text: 'Año pasado', operation: '-1y'} ,
        { alias: 'ny', text: 'Siguiente año', operation: '+1y'} ,
        // { alias: 'lyt', text: 'Last year from today', operation: '-1yt'} ,
      ],
      date: {
        from: {
          year: moment().year(),
          month: moment().month() + 1,
          day: moment().date()
        },
        to: {
          year: moment().year(),
          month: moment().month(),
          day: moment().date()
        }
      }
    };
  }

  private getEmissionPoints(): void {
    const page: Page = new Page();
    page.pageNumber = 0;
    page.size = 500;
    this
    ._emissionPointService
    .fetch(page, new EmissionPointQuery())
    .then((data: EmissionPoint[]) => {
      this.emissionPoints = data;
    })
    .catch(err => {
      console.warn(err);
    });
  }

  private getUsers() {
    const page: Page = new Page();
    page.pageNumber = 0;
    page.size = 500;
    const query: UserQuery = new UserQuery();
    query.emissionPoint = this.query.emissionPoint as any;
    this
    ._userService
    .fetch(page, query)
    .then((data: User[]) => {
      this.users = data;
    })
    .catch(err => console.warn(err));
  }

  private search() {
    // this.query.from = moment(moment(this.query.from).format('YYYY-MM-DD')).toDate();
    // this.query.to = moment(moment(this.query.to).format('YYYY-MM-DD')).toDate();
    this.query.from = this.date.from;
    this.query.to = this.date.to;
    console.log(this.query);
    this.setPage({ offset: 0 });
  }

  private setPage(pageInfo) {
    this.isFetching = true;
    this.page.pageNumber = pageInfo.offset;
    this
    ._service
    .paginate(this.page, this.query)
    .then((data: PagedData<Report>) => {
      // console.log(data.data);
      this.rows = data.data;
    })
    .catch(err => console.warn(err))
    .then(() => this.isFetching = false);
  }

  private initColumns(): void {
    this.columns = [
      {
        name: 'Cantidad',
        prop: 'quantity',
        cellClass: 'custom-cell'
      },
      {
        name: 'Servicio',
        prop: 'service',
        cellClass: 'custom-cell'
      },
      {
        name: 'Monto total',
        prop: 'amount',
        cellTemplate: this.currencyTpl
      }
    ];
  }

  ngOnInit() {
    this.initColumns();
    this.setDatepickerOptions();
    const token = localStorage.getItem('token');
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const emissionPoint = parseInt(localStorage.getItem('emissionPoint'), 10);
    const role = parseInt(localStorage.getItem('role'), 10);
    this.role = role;

    if (token) {
      this.getEmissionPoints();

      if (role === 2) {
        this.isValidSearch = true; // because the combos will be filled
        this.query.emissionPoint = emissionPoint as any;
        this.query.user = userId as any;
        this.getUsers();
      }
    }
  }
}
