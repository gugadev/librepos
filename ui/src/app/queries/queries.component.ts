import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Page } from '../shared/page.model';
import { DocumentQuery } from './document-query';
import { Document } from './document';
import { QueriesService } from './queries.service';
import { PagedData } from '../shared/paged-data.model';
import { Order } from './order';
// import * as esLocale from 'date-fns/locale/es';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import { Base64 } from '../shared/utils/base64';
import { EmissionPointService } from '../emission-points/emission-point.service';
import { EmissionPoint } from '../emission-points/emission-point.model';
import { EmissionPointQuery } from '../emission-points/query.model';
import { UserService } from '../users/users.service';
import { UserQuery } from '../users/query.model';
import { User } from '../users/user.model';
import { NgxDateRangePickerOptions } from 'ngx-daterangepicker';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {
  private page: Page = new Page();
  private query: DocumentQuery = new DocumentQuery();
  private rows: Document[];
  private columns: any[];
  private emissionPoints: EmissionPoint[] = [];
  private users: User[] = [];
  private isFetching = false;
  private datepickerOptions: NgxDateRangePickerOptions;
  private userData: any = {}; // role and emissionPoint properties
  @ViewChild('summaryTpl') private summaryTpl: TemplateRef<any>;
  @ViewChild('stateTpl') private stateTpl: TemplateRef<any>;
  @ViewChild('actionsTpl') private actionsTpl: TemplateRef<any>;
  @ViewChild('licenseTpl') private licenseTpl: TemplateRef<any>;
  @ViewChild('dateTpl') private dateTpl: TemplateRef<any>;
  @ViewChild('currencyTpl') private currencyTpl: TemplateRef<any>;
  private date: any; // here will be setted the date range

  constructor(
    private _service: QueriesService,
    private _emissionPointService: EmissionPointService,
    private _userService: UserService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
    this.userData = {
      allowedToSearchByPoint: true,
      allowedToSearchByUser: true
    };
  }

  private search() {
    // this.query.from = moment(moment(this.query.from).format('YYYY-MM-DD')).toDate();|
    // this.query.to = moment(moment(this.query.to).format('YYYY-MM-DD')).toDate();|
    this.query.from = this.date.from;
    this.query.to = this.date.to;
    // console.log(this.query);
    this.setPage({ offset: 0 });
  }

  private export() {
    this
    ._service
    .export(this.query)
    .then((base64: string) => {
      const blob: any = Base64.ToBlob(base64, 'application/vnd.ms-excel', undefined);
      const file = new File([blob], 'reporte-ventas.xlsx', { type: 'application/vnd.ms-excel' });
      FileSaver.saveAs(file);
    })
    .catch(err => {
      console.warn(err);
    });
  }

  private print(order: Order) {
    console.log(order);
  }

  private setPage(pageInfo) {
    this.isFetching = true;
    this.page.pageNumber = pageInfo.offset;
    this
    ._service
    .paginate(this.page, this.query)
    .then((data: PagedData<Document>) => {
      // console.log(data.data);
      this.rows = data.data;
    })
    .catch(err => console.warn(err))
    .then(() => this.isFetching = false);
  }

  private initColumns(): void {
    this.columns = [
      {
        name: 'Serie',
        prop: 'document.serie',
        cellTemplate: this.summaryTpl
      },
      {
        name: 'Servicio',
        prop: 'detail.service.name',
        cellClass: 'custom-cell'
      },
      {
        name: 'Monto total',
        prop: 'document.totalAmount',
        cellTemplate: this.currencyTpl
      },
      {
        name: 'Monto neto',
        prop: 'document.netAmount',
        cellTemplate: this.currencyTpl
      },
      {
        name: 'Total IGV',
        prop: 'tax.amount',
        cellTemplate: this.currencyTpl
      },
      {
        name: 'Fecha emisión',
        prop: 'document.emissionDate',
        cellTemplate: this.dateTpl
      },
      {
        name: 'Placa',
        prop: 'document.plate',
        cellTemplate: this.licenseTpl
      },
      {
        name: 'Punto emisión',
        prop: 'document.emissionPoint.name',
        cellClass: 'custom-cell'
      },
      {
        name: 'Usuario',
        prop: 'document.creator',
        cellClass: 'custom-cell'
      },
      {
        name: 'Estado',
        prop: 'document.emissionState',
        cellTemplate: this.stateTpl
      },
      {
        name: 'Acciones',
        prop: 'document.id',
        cellTemplate: this.actionsTpl
      }
    ];
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

  ngOnInit() {
    this.setDatepickerOptions();
    const token = localStorage.getItem('token');
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const role = parseInt(localStorage.getItem('role'), 10);
    const point = parseInt(localStorage.getItem('emissionPoint'), 10);

    if (token) {
      this.setPage({ offset: 0 });
      this.initColumns();
      this.getEmissionPoints();
    }
    if (!isNaN(role) && (role !== 1 && role !== 3)) {
      this.userData.allowedToSearchByUser = false;
      this.query.user = userId;
    }
    if (!isNaN(point) && (role !== 1 && role !== 3)) {
      this.userData.allowedToSearchByPoint = false;
      this.query.emissionPoint = point;
      this.getUsers();
    }
  }
}
