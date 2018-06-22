import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Service } from '../service.model';
import { EmissionPoint } from '../../emission-points/emission-point.model';
import { EmissionPointService } from '../../emission-points/emission-point.service';
import { Page } from '../../shared/page.model';
import { EmissionPointQuery } from '../../emission-points/query.model';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private service: Service;
  private emissionPoints: Array<EmissionPoint>;
  private isFormValid: boolean;
  private submitErrors: Array<string>;

  constructor(
    private _service: ServicesService,
    private _epService: EmissionPointService,
    private _snotify: SnotifyService,
    private route: ActivatedRoute) { }

  formatCurrency(e): void {
    this.service.cost = numeral(this.service.cost).format('0,0.00') as any;
  }

  validate(e): void {
    this
    .service
    .validate()
    .then(() => {
      this.isFormValid = true;
    })
    .catch(err => {
      this.isFormValid = false;
    });
  }

  private update(): void {
    this
    ._service
    .update(this.service)
    .then((data: Service) => {
      this
      ._snotify
      .success('Servicio actualizado', null, {
        position: SnotifyPosition.rightTop,
        closeOnClick: true,
        timeout: 3000,
      });
    })
    .catch(e => console.warn(e));
  }

  private getEmissionPoints(): void {
    const page: Page = new Page();
    const query: EmissionPointQuery = new EmissionPointQuery();
    page.pageNumber = 0;
    page.size = 500;
    this
    ._epService
    .fetch(page, query)
    .then((points: Array<EmissionPoint>) => {
      this.emissionPoints = points;
    })
    .catch(e => {
      console.warn(e);
    });
  }

  private findService(): void {
    this
    .route
    .params
    .subscribe(({ code }) => {
      this
      ._service
      .find(code)
      .then((data: Service) => {
        this.service = data;
      })
      .catch(e => {
        console.warn(e);
      });
    });
  }

  ngOnInit() {
    this.service = new Service();
    this.emissionPoints = new Array<EmissionPoint>();
    this.submitErrors = new Array<string>();
    this.findService();
    this.getEmissionPoints();
  }

}
