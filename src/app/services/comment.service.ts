import { Injectable } from '@angular/core';
import { URLAPI } from './url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl: string = URLAPI;

  constructor(private http: HttpClient) { }

  addComment(survey_id: number, comment_content: string) {
    const url = `${this.baseUrl}/comment`;
    const body = {
      survey_id,
      comment_content
    }
    return this.http.post<any>(url, body).pipe(
      map((res) => res.message),
      catchError((err) => of(err.error))
    );
  }

  deleteComment(comment_id: number): Observable<any> {
    /*let params = new HttpParams();
    params = params.append(":comment_id", comment_id);*/
    const url = `${this.baseUrl}/comment/id/`;
    return this.http.delete(url + comment_id)
  }

  deleteAllComment(): Observable<any> {
    const url = `${this.baseUrl}/comment/`;
    return this.http.delete(url)
  }
}
