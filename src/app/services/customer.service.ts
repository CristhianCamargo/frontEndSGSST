import { Injectable } from '@angular/core';
import { URLAPI } from './url';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl: string = URLAPI;

  constructor(private http: HttpClient) { }

  getCustomer(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url);
  }

  addCustomer(
    role_id: number,
    survey_id: number,
    customer_document: string,
    customer_firstname: string,
    customer_lastname: string,
    customer_phone: string,
    customer_state: boolean,
    access_email: string,
    access_pass: string
  ) {
    const url = `${this.baseUrl}/customer`;
    const body = {
      role_id,
      survey_id,
      customer_document,
      customer_firstname,
      customer_lastname,
      customer_phone,
      customer_state,
      access_email,
      access_pass,
    };

    return this.http.post<any>(url, body).pipe(
      map((res) => res.message),
      catchError((err) => of(err.error))
    );
  }
  updateCustomer(customer_id: number, body: object
  ) {
    const url = `${this.baseUrl}/customer/`;
    return this.http.put<any>(url + customer_id, body).pipe(
      map((res) => res.message),
      catchError((err) => of(err.error))
    );
  }

  deleteCustomer(customer_id: number) {
    const url = `${this.baseUrl}/customer/`;
    return this.http.delete(url + customer_id);
  }

  getCustomerByState(urlState: string): Observable<any> {
    const url = `${this.baseUrl}/customer/state`;
    return this.http.get(url + urlState);
  }

  getCustomerById(customer_id: number): Observable<any> {
    const url = `${this.baseUrl}/customer/`;
    return this.http.get(url + customer_id);
  }

  getCustomerAuth() {
    if (localStorage.getItem('authCredential')) {
      const customer = JSON.parse(localStorage.getItem('authCredential')!);
      return customer;
    }
  }
}
