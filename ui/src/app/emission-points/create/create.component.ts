import { Component, OnInit } from '@angular/core';
import { EmissionPoint } from '../emission-point.model';
import { EmissionPointService } from '../emission-point.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private emissionPoint: EmissionPoint = new EmissionPoint();
  private submitErrors: Array<string> = [];
  private isFormValid: boolean;

  constructor(
    private snotify: SnotifyService,
    private service: EmissionPointService) { }

  register(): void {
    this
    .service
    .create(this.emissionPoint)
    .then((point: EmissionPoint) => {
      console.log(point);
      this.emissionPoint.reset();
      this.snotify.success('Punto de emisión registrado', null, {
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
  }

}
