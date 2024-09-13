import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Role } from "../enums/role";
import { AuthenticationRequest } from "../models/authentication-request";
import { User } from "../models/user";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private userRoleKey = 'userRole';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient ,
    private router : Router
  ) {}

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setUserRole(role: Role): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.userRoleKey, role);
    }
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userRoleKey);
    }
  }

  login(authRequest: AuthenticationRequest): Observable<any> {
    return this.http.post('http://localhost:8888/USER-SERVICE/api/auth/login', authRequest)
      .pipe(map(data => data));
  }

  signup(user: User): Observable<any> {
    return this.http.post('http://localhost:8888/USER-SERVICE/api/auth/signup', user);
  }

  // signup(fullName: string, username: string, email: string, password: string): Observable<any> {
  //   return this.http.post('http://localhost:8888/USER-SERVICE/api/auth/signup', {
  //     fullName,
  //     username,
  //     email,
  //     password,
  //     role: Role.CUSTOMER
  //   });
  // }


  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
