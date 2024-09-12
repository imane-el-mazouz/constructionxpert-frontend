// import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Project } from '../models/project.model';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ProjectService {
//   private apiUrl = 'http://localhost:8888/PROJECT-SERVICE/api/projects';
//
//   constructor(private http: HttpClient) { }
//
//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }
//
//   getAllProjects(): Observable<Project[]> {
//     return this.http.get<Project[]>(this.apiUrl, { headers: this.getHeaders() });
//   }
//
//   deleteProject(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Project } from '../models/project.model';
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8888/PROJECT-SERVICE/api/projects';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
  existProject(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/exist`, { headers: this.getHeaders() });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getProjectTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`/project/{projectId}`);
  }

}
