import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserDetails } from '../models/user-details.model';
import { RestAPIService } from './rest-api.service';
import { User } from '../models/user.model';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class PersonDetails extends RestAPIService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getDetailsById(id: string): Observable<User> {
    return this.get<UserDetails>(`/details/${id}`).pipe(
      map((user) => {
        const sortedUserList: User = { ...user, quotes: this.sortQuotesAndCreateArray(user.quotes) };
         return sortedUserList;
      }),
    );
  }

  private sortQuotesAndCreateArray(quotes: { [likes: number]: string[] }): Quote[] {
    const sortedKeys = Object.keys(quotes).sort((a, b) => Number(b) - Number(a));
    return this.createQuotesArray(quotes, sortedKeys);
  }

  private createQuotesArray(quotes: { [likes: number]: string[] }, sortedKeys: string[]): Quote[] {
    const quotesArray: Quote[] = [];
    sortedKeys.forEach((key) => {
      quotes[key].sort((a, b) => a.localeCompare(b));
      quotes[key].forEach((content) => {
        quotesArray.push({ content, likes: key });
      });
    });
    return quotesArray;
  }
}