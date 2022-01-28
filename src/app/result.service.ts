import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class ResultService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('admin/result', http);
   }

   getQuestion(test_id,question_id){
    return this.http.get(`${this.fullUrl}/${test_id}/${question_id}`);
   }
}
