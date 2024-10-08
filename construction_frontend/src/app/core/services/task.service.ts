import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../models/task';
import { Resource } from '../models/resource';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.tasksUrl}`;
  private resourceUrl = `${environment.resourcesUrl}`;
  private http = inject(HttpClient);

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task)
      .pipe(catchError(this.handleError));
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`)
      .pipe(catchError(this.handleError));
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getResourcesByTaskId(taskId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.resourceUrl}/task/${taskId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

///////////







/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Task } from "../models/task";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {Resource} from "../models/resource";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8888/TASK-SERVICE/api/tasks';
  private baseUrl = 'http://localhost:8888/RESOURCE-SERVICE/api/resources';



  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  getResourcesByTaskId(taskId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/task/${taskId}` , {headers : this.getHeaders()});
  }


}
*/
