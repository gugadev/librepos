import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../shared/utils/environment';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url = `${Environment.get().apiUrl}/configurations`;

  constructor(private http: HttpClient) { }

  public getByZone(zoneId: number): Promise<Settings> {
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .get(`${this.url}/${zoneId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe(res => {
        const {
          status,
          data,
          errors
        }: any = res;
        if (status === 200) {
          const settings = new Settings();
          settings.documentType = data.documentType;
          settings.serie = data.serie;
          settings.issuerName = data.issuerName;
          settings.issuerRUC = data.issuerRUC;
          settings.igvRate = data.igvRate;
          settings.emissionPoint = data.emissionPoint;
          ok(settings);
        } else {
          fail(errors);
        }
      }, err => {
        fail([err.message]);
      });
    });
  }

  public updateByZone(zoneId: number, payload: Settings): Promise<Settings> {
    return new Promise((ok: Function, fail: Function) => {
      this
      .http
      .put(this.url, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .subscribe(res => {
        const {
          status,
          data,
          errors
        }: any = res;

        if (status === 200) {
          const updatedSettings = new Settings();
          updatedSettings.documentType = data.documentType;
          updatedSettings.serie = data.serie;
          updatedSettings.issuerName = data.issuerName;
          updatedSettings.issuerRUC = data.issuerRUC;
          updatedSettings.igvRate = data.igvRate;
          updatedSettings.emissionPoint = data.emissionPoint;
          ok(updatedSettings);
        } else {
          fail(errors);
        }
      }, err => {
        fail([err.message]);
      });
    });
  }
}
