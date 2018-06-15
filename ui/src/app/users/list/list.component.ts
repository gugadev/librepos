import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../shared/page.model';
import { PagedData } from '../../shared/paged-data.model';
import { User } from '../user.model';
import { UserQuery } from '../query.model';
import { EmissionPointQuery } from '../../emission-points/query.model';
import { RoleService } from '../../shared/role.service';
import { EmissionPointService } from '../../emission-points/emission-point.service';
import { Role } from '../../shared/role.model';
import { EmissionPoint } from '../../emission-points/emission-point.model';
import { UserService } from '../users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private page = new Page();
  private query: UserQuery = new UserQuery();
  private rows = new Array<User>();
  private columns: Array<any>;
  private roles: Array<Role> = [];
  private emissionPoints: Array<EmissionPoint> = [];
  // tells if is fetching
  private isFetching = false;
  @ViewChild('emailTpl')
  private emailTpl: TemplateRef<any>;
  @ViewChild('stateTpl')
  private stateTpl: TemplateRef<any>;
  @ViewChild('actionsTpl')
  private actionsTpl: TemplateRef<any>;

  constructor(
    private service: UserService,
    private roleService: RoleService,
    private pointService: EmissionPointService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  search() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.isFetching = true;
    this.page.pageNumber = pageInfo.offset;
    this.service
    .paginate(this.page, this.query)
    .then((data: PagedData<User>) => {
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
        name: 'Nombre',
        prop: 'name',
        cellClass: 'custom-cell',
      },
      {
        name: 'Alias',
        prop: 'username',
        cellClass: 'custom-cell',
      },
      {
        name: 'Email',
        prop: 'email',
        cellTemplate: this.emailTpl
      },
      {
        name: 'Rol',
        prop: 'role.name',
        cellClass: 'custom-cell',
      },
      {
        name: 'Punto de emisión',
        prop: 'emissionPoint.name',
        cellClass: 'custom-cell',
      },
      {
        name: 'Estado',
        prop: 'isActive',
        cellTemplate: this.stateTpl,
      },
      {
        name: 'Actions',
        prop: 'username',
        cellTemplate: this.actionsTpl,
      }
    ];
  }

  private getRoles(): void {
    this
    .roleService
    .getAll()
    .then((roles: Array<Role>) => {
      this.roles = roles;
    })
    .catch(e => {
      console.warn(e);
    });
  }

  private getEmissionPoints(): void {
    const page: Page = new Page();
    const query: EmissionPointQuery = new EmissionPointQuery();

    // parámetros para paginar
    page.pageNumber = 0;
    page.size = 500;
    query.isActive = '-';

    this
    .pointService
    .fetch(page, query)
    .then((points: Array<EmissionPoint>) => {
      this.emissionPoints = points;
    })
    .catch(e => {
      console.warn(e);
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.setPage({ offset: 0 });
      this.initColumns();
      this.getEmissionPoints();
      this.getRoles();
    }
  }
}
