import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly serverUrl: string = 'https://reqres.in/api';

  constructor(private httpClient: HttpClient) {}

  register(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/register', body);
  }

  login(body): Observable<any> {
    return this.httpClient.post(this.serverUrl + '/login', body);
  }
}
