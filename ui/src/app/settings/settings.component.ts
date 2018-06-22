import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { EmissionPointService } from '../emission-points/emission-point.service';
import { EmissionPoint } from '../emission-points/emission-point.model';
import { Page } from '../shared/page.model';
import { EmissionPointQuery } from '../emission-points/query.model';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private settings = new Settings();
  private zones: EmissionPoint[] = [];
  private canSubmit = false;

  constructor(
    private _service: SettingsService,
    private _snotify: SnotifyService,
    private _zoneService: EmissionPointService) { }

  validate(): void {
    this.settings.validate().then(isValid => {
      console.log(isValid);
      this.canSubmit = isValid;
    });
  }

  updateSettings() {
    this
    ._service
    .updateByZone(this.settings.emissionPoint, this.settings)
    .then((updatedSettings: Settings) => {
      console.log(updatedSettings);
      this
      ._snotify
      .success('Valores actualizados', null, {
        showProgressBar: true,
        closeOnClick: true,
        position: SnotifyPosition.rightTop,
        timeout: 3500,
      });
    })
    .catch((err: string[]) => {
      let errorMessage = `Ocurrión un error al actualizar:\n`;
      errorMessage += err.reduce((e, prev) => `${e}\n${prev}`, '');
      this
      ._snotify
      .error(errorMessage, null, {
        showProgressBar: true,
        closeOnClick: true,
        position: SnotifyPosition.rightTop,
        timeout: 3500,
      });
    });
  }

  getSettings() {
    this
    ._service
    .getByZone(this.settings.emissionPoint)
    .then((data: Settings) => {
      this.settings = data;
    })
    .catch(err => {
      console.warn(err);
    });
  }

  private getEmissionPoints(): void {
    const page = new Page();
    page.pageNumber = 0;
    page.size = 500;

    this
    ._zoneService
    .fetch(page, new EmissionPointQuery())
    .then((data: EmissionPoint[]) => {
      this.zones = data;
    })
    .catch(err => {
      console.warn(err);
    });
  }

  ngOnInit() {
    this.getEmissionPoints();
  }

}
