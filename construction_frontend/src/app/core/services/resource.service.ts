// import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {Resource} from "../models/resource";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ResourceService {
//   private apiUrl = 'http://localhost:8888/RESOURCE-SERVICE/api/resources';
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
//   getResources(): Observable<Resource[]> {
//     return this.http.get<Resource[]>(this.apiUrl, { headers: this.getHeaders() });
//   }
//
//   addResource(resource: Resource): Observable<Resource> {
//     return this.http.post<Resource>(this.apiUrl, resource, { headers: this.getHeaders() });
//   }
//
//   updateResource(id: number, resource: Resource): Observable<Resource> {
//     return this.http.put<Resource>(`${this.apiUrl}/${id}`, resource, { headers: this.getHeaders() });
//   }
//
//   deleteResource(id: number | undefined): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
//   }
//
//   getResourceById(id: number): Observable<Resource> {
//     return this.http.get<Resource>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Resource } from "../models/resource";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'http://localhost:8888/RESOURCE-SERVICE/api/resources';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.apiUrl, resource, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateResource(id: number, resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}/resource/${id}`, resource, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteResource(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }



  getResourceById(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/get/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // getResourcesByTaskId(taskId: number): Observable<Resource[]> {
  //   return this.http.get<Resource[]>(`${this.apiUrl}/${taskId}/resources` , {headers : this.getHeaders()});
  // }

  getResourcesByTaskId(taskId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/task/${taskId}` , {headers : this.getHeaders()});
  }

  getFilteredResources(
    provider?: string,
    minQuantity?: number,
    maxQuantity?: number,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'quantity',
    direction: string = 'asc'
  ): Observable<Page<Resource>> {
    const params = {
      provider: provider || '',
      minQuantity: minQuantity?.toString() || '',
      maxQuantity: maxQuantity?.toString() || '',
      page: page.toString(),
      size: size.toString(),
      sortBy,
      direction
    };

    return this.http.get<Page<Resource>>(this.apiUrl, { headers: this.getHeaders(), params });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
