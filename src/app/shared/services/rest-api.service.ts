import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  private getHeaderOptions(type: string): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': type,
      })
    };
  }

  public get<T>(params: string): Observable<T> {
    return this.http.get<T>(this.url+params, this.getHeaderOptions('application/json')).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}