import { Injectable } from '@angular/core';
import { URLAPI } from './url';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = URLAPI;

  constructor(private http: HttpClient) {

  }

  dataAuth(body: object){
    const url = `${this.baseUrl}/auth`;
    return this.http.post<any>(url,body).pipe(
        tap((res) => {
            if(res.message == "OK"){
                localStorage.setItem("authCredential", JSON.stringify(res.user));
                localStorage.setItem("authToken", res.token);

            }
        }),
        map((res)=> res.message),
        catchError((err) => of(err.error))
      );
  }



}
