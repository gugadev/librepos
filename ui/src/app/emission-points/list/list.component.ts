import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { EmissionPointQuery } from '../query.model';
import { Page } from '../../shared/page.model';
import { EmissionPoint } from '../emission-point.model';
import { EmissionPointService } from '../emission-point.service';
import { PagedData } from '../../shared/paged-data.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private page: Page = new Page();
  private query: EmissionPointQuery = new EmissionPointQuery();
  private rows = new Array<EmissionPoint>();
  private columns: Array<any>;
  private isFetching: boolean;
  @ViewChild('stateTpl')
  private stateTpl: TemplateRef<any>;
  @ViewChild('actionsTpl')
  private actionsTpl: TemplateRef<any>;

  constructor(private service: EmissionPointService) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  search() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.isFetching = true;
    this.page.pageNumber = pageInfo.offset;
    this.service
    .paginate(this.page, this.query)
    .then((data: PagedData<EmissionPoint>) => {
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
    // inicializar las columnas
    this.columns = [
      {
        name: 'Nombre',
        prop: 'name',
        cellClass: 'custom-cell'
      },
      {
        name: 'Estado',
        prop: 'isActive',
        cellTemplate: this.stateTpl,
      },
      {
        name: 'Acciones',
        prop: 'id',
        cellTemplate: this.actionsTpl,
      }
    ];
  }

  ngOnInit() {
    this.initColumns();

    if (localStorage.getItem('token')) {
      this.setPage({ offset: 0 });
    }
  }
}
