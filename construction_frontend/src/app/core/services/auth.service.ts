import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Role } from '../enums/role';
import { AuthenticationRequest } from '../models/authentication-request';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'token';
  private userRoleKey = 'userRole';

  private http = inject(HttpClient);
  private router = inject(Router);

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUserRole(role: Role): void {
    localStorage.setItem(this.userRoleKey, role);
  }

  getUserRole(): Role | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role as Role;
    }
    return null;
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
  }

  login(authRequest: AuthenticationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, authRequest)
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}