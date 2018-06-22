import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../shared/utils/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://127.0.0.1:5000/api/auth';

  constructor(private http: HttpClient) { }

  public login(credentials): Promise<any> {
    return this.http.post(Environment.get().authUrl, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).toPromise();
  }
}
