import { Injectable } from '@angular/core';
import { URLAPI } from './url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {

    private baseUrl: string = URLAPI;

    constructor(private http: HttpClient) {
    }

    addAnswer(body: object
    ) {

        const url = `${this.baseUrl}/answer`;

        return this.http.post<any>(url, body).pipe(
            map((res) => res.message),
            catchError((err) => of(err.error))
        );
    }

    getAnswerByOption(urlOption: number): Observable<any> {
        let params = new HttpParams();
        params = params.append("option_id", urlOption);
        const url = `${this.baseUrl}/answer/option`;
        return this.http.get(url, {params});

    }
    getAnswerByQuestion(urlOption: number): Observable<any> {
        let params = new HttpParams();
        params = params.append("question_id", urlOption);
        const url = `${this.baseUrl}/answer/question`;
        return this.http.get(url, {params});

    }
    getAnswerByCustomer(urlOption: number): Observable<any> {
        let params = new HttpParams();
        params = params.append("customer_id", urlOption);
        const url = `${this.baseUrl}/answer/customer`;
        return this.http.get(url, {params});

    }

    getAnswerByQuestionAndCustomer(urlOption: number): Observable<any>{
        let params = new HttpParams();
        params = params.append("question_id", urlOption);
        const url = `${this.baseUrl}/answer/quesCustomer`;
        return this.http.get(url, {params});
    }

    getAnswerByOQ(urlQuestion: number, urlOption: number): Observable<any> {
        let params = new HttpParams();
        params = params.append("question_id", urlQuestion).append("option_id", urlOption);
        const url = `${this.baseUrl}/answer/quesOption`;
        return this.http.get(url, {params});
    }



}
