import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../shared/role.service';
import { User } from '..//user.model';
import { validate } from 'class-validator';
import { EmissionPointService } from '../../emission-points/emission-point.service';
import { Page } from '../../shared/page.model';
import { EmissionPointQuery } from '../../emission-points/query.model';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { UserService } from '../users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private roles: Array<any> = [];
  private emissionPoints: Array<any> = [];
  private user: User = new User();
  private isFormValid: boolean;
  private submitErrors: Array<string> = [];

  constructor(
    private service: UserService,
    private roleService: RoleService,
    private pointService: EmissionPointService,
    private snotify: SnotifyService
  ) { }

  register(): void {
    this
    .service
    .create(this.user)
    .then((data: User) => {
      this.user.reset();
      this.snotify.success('Usuario registrado', null, {
        showProgressBar: true,
        closeOnClick: true,
        position: SnotifyPosition.rightTop,
        timeout: 3500,
      });
    })
    .catch(e => {
      console.warn(e);
      this.submitErrors = e;
    });
  }

  validate(): any {
    validate(this.user).then((errors) => {
      if (!errors.length) {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this
      .roleService
      .getAll()
      .then(data => {
        this.roles = data;
      })
      .catch(e => {
        console.warn(e);
      });

      const page: Page = new Page();
      const query: EmissionPointQuery = new EmissionPointQuery();

      page.pageNumber = 0;
      page.size = 500;
      query.isActive = '-';

      this
      .pointService
      .fetch(page, query)
      .then(points => {
        this.emissionPoints = points;
      })
      .catch(e => {
        console.warn(e);
      });
    }
  }

}
