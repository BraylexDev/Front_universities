import { Injectable } from '@angular/core';
import { apiServer } from '../apiServer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/domain/login';
import { User } from 'src/app/domain/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = apiServer.serverUrl;

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<User> {
    return this.http.post(`${this.baseUrl}/user/login`,login);
  }
}
