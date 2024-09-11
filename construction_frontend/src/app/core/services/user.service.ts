import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8888/USER-SERVICE/api/user';

  constructor(
    private http: HttpClient,
    private platformId: Object
  ) {
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {headers: this.getHeaders()});
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, {headers: this.getHeaders()});
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/users`, user, {headers: this.getHeaders()});
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user, {headers: this.getHeaders()});
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`, {headers: this.getHeaders()});
  }
}


