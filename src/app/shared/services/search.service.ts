import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { RestAPIService } from './rest-api.service';
import { User } from '../models/user.model';
import { SearchResults } from '../models/search-results.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends RestAPIService {
  constructor(http: HttpClient) {
    super(http);
  }

  public searchForUsers(searchTerm?: string, color?: string): Observable<User[]> {
    const url = this.generateQueryParam(searchTerm, color);
    return this.get<SearchResults>(url).pipe(
      map((results: SearchResults) => {
        return results;
      }),
      map((results: SearchResults) => results.matches)
    );
  }

  generateQueryParam(searchTerm?: string, color?: string){
    if(searchTerm){
      return `/search?term=${searchTerm}`
    }
    if(color){
      return `/search?color=${color}`
    }
    if(searchTerm && color){
      return `/search?term=${searchTerm}color=${color}`
    }
    return '/search'
  }
}