import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BaseService } from './core/base/base-service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('questions', http);
   }
   getid(id) {
    return this.http.get(`${this.prefix}topics/${id}/questions`);
  }

  import(id, data){
    return this.http.post(`${this.prefix}questions/upload/${id}`, data);
  }

  search(query){
    return this.http.get(`https://e-testing.dsd.go.th/api/questions?question_name=${query}&is_approve=false`);
  }

  audit(id){
    return this.http.get(`${this.fullUrl}/audit/${id}`);
  }

  upload1<HttpHeaderResponse>(id, target: FormData){
    return this.http.post(`${this.prefix}questions/upload/${id}`, target, {
        reportProgress: true,
        observe: 'events'
    }).pipe(
        map((event) => {
            switch (event.type){
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: `${progress}` };
                case HttpEventType.Response:
                    return { status: 'success', message:  event.body };
                default:
                    return `Unhandled event: ${event.type}`;
                }
            }
        ),
        catchError(err => {
            return of({ status: 'error', message:  `${err.message}` });
        })
    );
}
}
