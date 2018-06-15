import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://127.0.0.1:5000/api/auth';

  constructor(private http: HttpClient) { }

  public login(credentials): Promise<any> {
    return this.http.post(this.url, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).toPromise();
  }
}
