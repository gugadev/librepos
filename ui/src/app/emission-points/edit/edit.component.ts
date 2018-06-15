import { Component, OnInit } from '@angular/core';
import { EmissionPoint } from '../emission-point.model';
import { EmissionPointService } from '../emission-point.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private emissionPoint: EmissionPoint = new EmissionPoint();
  private submitErrors: Array<string> = [];
  private isFormValid: boolean;

  constructor(
    private snotify: SnotifyService,
    private service: EmissionPointService,
    private route: ActivatedRoute) { }

  update(): void {
    this
      .service
      .update(this.emissionPoint)
      .then((point: EmissionPoint) => {
        console.log(point);
        this.emissionPoint.reset();
        this.snotify.success('Punto de emisión actualizado', null, {
          showProgressBar: true,
          closeOnClick: true,
          position: SnotifyPosition.rightTop,
          timeout: 3500,
        });
      })
      .catch((errors: Array<string>) => {
        this.submitErrors = errors;
      });
  }

  validate() {
    this
      .emissionPoint
      .validate()
      .then(() => {
        this.isFormValid = true;
      })
      .catch((errors) => {
        this.isFormValid = false;
      });
  }

  ngOnInit() {
    this
    .route
    .params
    .subscribe(({ id }) => {
      this
      .service
      .find(id)
      .then((point: EmissionPoint) => {
        this.emissionPoint = point;
      })
      .catch((e: Array<string>) => {
        console.warn(e);
      });
    });
  }

}
