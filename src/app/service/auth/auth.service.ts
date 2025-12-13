import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from 'src/app/domain/user';
import { apiServer } from '../apiServer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = apiServer.serverUrl + '/api/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar si hay un token guardado al iniciar
    this.checkStoredToken();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        tap((response) => {
          // Guardar token y datos del usuario
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('tokenType', response.tokenType);

          const user: User = {
            name: response.name,
            userName: response.username,
            email: response.email,
            rol: response.rol,
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
      );
  }

  register(userData: RegisterRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/signup`, userData, {
      responseType: 'text',
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Verificar si el token está expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private checkStoredToken(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('currentUser');

    if (token && userStr && this.isAuthenticated()) {
      const user = JSON.parse(userStr);
      this.currentUserSubject.next(user);
    } else {
      this.logout();
    }
  }
}
