import { Injectable } from '@angular/core';
import { URLAPI } from './url';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private baseUrl: string = URLAPI;

  constructor(private http: HttpClient) { }

  getValidation(url: string, req: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + url + req).pipe(
      map((res) => res.ok),
      catchError((err) => of(err.error))
    )
  }

  getValidationBody(url: string, body: object): Observable<any> {
    return this.http.post<any>(this.baseUrl + url, body).pipe(
      map((res) => res.ok),
      catchError((err) => of(err.error))
    )
  }
}
