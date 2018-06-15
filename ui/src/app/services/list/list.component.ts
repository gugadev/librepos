import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Page } from '../../shared/page.model';
import { ServiceQuery } from '../query.model';
import { Service } from '../service.model';
import { ServicesService } from '../services.service';
import { PagedData } from '../../shared/paged-data.model';
import { EmissionPoint } from '../../emission-points/emission-point.model';
import { EmissionPointService } from '../../emission-points/emission-point.service';
import { EmissionPointQuery } from '../../emission-points/query.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private page: Page = new Page();
  private query: ServiceQuery = new ServiceQuery();
  private rows = new Array<Service>();
  private emissionPoints = new Array<EmissionPoint>();
  private columns: Array<any>;
  private isFetching: boolean;
  @ViewChild('stateTpl')
  private stateTpl: TemplateRef<any>;
  @ViewChild('priceTpl')
  private priceTpl: TemplateRef<any>;
  @ViewChild('needPlateTpl')
  private needPlateTpl: TemplateRef<any>;
  @ViewChild('actionsTpl')
  private actionsTpl: TemplateRef<any>;

  constructor(
    private service: ServicesService,
    private emissionPointService: EmissionPointService) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  search() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.isFetching = true;
    this.page.pageNumber = pageInfo.offset;
    this
    .service
    .paginate(this.page, this.query)
    .then((data: PagedData<Service>) => {
      this.page = data.page;
      this.rows = data.data;
    })
    .catch(e => {
      console.warn(e);
    })
    .then(() => {
      this.isFetching = false;
    });
  }

  private initColumns(): void {
    this.columns = [
      {
        name: 'Código',
        prop: 'code',
        cellClass: 'custom-cell'
      },
      {
        name: 'Nombre',
        prop: 'name',
        cellClass: 'custom-cell'
      },
      {
        name: 'Tarifa',
        prop: 'cost',
        // cellClass: 'custom-cell'
        cellTemplate: this.priceTpl
      },
      {
        name: 'U. Medida',
        prop: 'unitMeasurement'
      },
      {
        name: 'Necesita Placa',
        prop: 'needPlate',
        cellTemplate: this.needPlateTpl
      },
      {
        name: 'Punto de emisión',
        prop: 'emissionPoint.name'
      },
      {
        name: 'Estado',
        prop: 'isActive',
        cellTemplate: this.stateTpl
      },
      {
        name: 'Acciones',
        prop: 'code',
        cellTemplate: this.actionsTpl,
      }
    ];
  }

  private getEmissionPoints() {
    const page: Page = new Page();
    page.pageNumber = 0;
    page.size = 500;
    const query: EmissionPointQuery = new EmissionPointQuery();
    this
    .emissionPointService
    .fetch(page, query)
    .then((data: Array<EmissionPoint>) => {
      this.emissionPoints = data;
    })
    .catch(e => {
      console.warn(e);
    });
  }

  ngOnInit() {
    this.initColumns();

    if (localStorage.getItem('token')) {
      this.setPage({ offset: 0 });
      this.getEmissionPoints();
    }
  }

}
