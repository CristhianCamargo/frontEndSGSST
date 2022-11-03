import { Injectable } from '@angular/core';
import { URLAPI } from './url';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl: string = URLAPI;

  constructor(private http: HttpClient) {
  }

  getQuestion(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url);
  }

  addQuestion(survey_id: number, question_content: string) {
    const url = `${this.baseUrl}/question/`;

    const body = {
      survey_id,
      question_content
    }
    return this.http.post<any>(url, body).pipe(
      map((res) => res.message),
      catchError((err) => of(err.error))
    );
  }

  updateQuestion(question_id: number, survey_id: number, question_content: string) {
    const url = `${this.baseUrl}/question/`;

    const body = {
      survey_id,
      question_content
    }

    return this.http.put<any>(url+question_id , body).pipe(
      map((res) => res.message),
      catchError((err) => of(err.error))
    );
  }

  deleteQuestion(question_id: number) {
    const url = `${this.baseUrl}/question/`;
    return this.http.delete(url + question_id);
  }
}