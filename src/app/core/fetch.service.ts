import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { ICustomer } from '../interfaces/ICustomers';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  baseUrl = 'assets/';

  constructor(private http: HttpClient) {
    console.log('rodei mmeu service');
  }

  getCostumers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'database.json').pipe(catchError(this.handleError));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
