import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../shared/role.service';
import { validate } from 'class-validator';
import { EmissionPointService } from '../../emission-points/emission-point.service';
import { Page } from '../../shared/page.model';
import { EmissionPointQuery } from '../../emission-points/query.model';
import { ActivatedRoute } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { UserService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private roles: Array<any> = [];
  private emissionPoints: Array<any> = [];
  private user: User = new User();
  private isFormValid = true;
  private submitErrors: Array<string> = [];

  constructor(
    private service: UserService,
    private roleService: RoleService,
    private pointService: EmissionPointService,
    private activeRoute: ActivatedRoute,
    private snotify: SnotifyService
  ) { }

  update(): void {
    this.user.turnId = Number(this.user.turnId);
    this
      .service
      .update(this.user)
      .then((data: User) => {
        // this.user.reset();
        this.snotify.success('Usuario actualizado', null, {
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
      // Traer los roles
      this
        .roleService
        .getAll()
        .then(data => {
          this.roles = data;
        })
        .catch(e => {
          console.warn(e);
        });

      const page = new Page();
      const query: EmissionPointQuery = new EmissionPointQuery();

      page.pageNumber = 0;
      page.size = 500;
      query.isActive = '-';

      // Traer los puntos de emisión
      this
        .pointService
        .fetch(page, query)
        .then(points => {
          this.emissionPoints = points;
        })
        .catch(e => {
          console.warn(e);
        });

      // Traer el usuario en cuestión
      this
      .activeRoute
      .params
      .subscribe(params => {
        this
          .service
          .find(params.username)
          .then((data: User) => {
            this.user = data;
          })
          .catch(e => {
            console.warn(e);
          });
      });
    }
  }

}
