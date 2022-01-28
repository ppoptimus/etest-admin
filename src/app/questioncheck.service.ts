import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestioncheckService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('question_checks', http);
   }
   getstart(id) {
    return this.http.get(`${this.prefix}/start/${id}`);
  }
  next(data) {
    return this.http.post('https://e-testing.dsd.go.th/api/question_checks/next', data);
  }

  prev(data) {
    return this.http.post('https://e-testing.dsd.go.th/api/question_checks/prev', data);
  }

  end(data) {
    return this.http.post('https://e-testing.dsd.go.th/api/question_checks/end', data);
  }

  goto(data,no){
    return this.http.post(`https://e-testing.dsd.go.th/api/question_checks/goto/${no}`, data);
  }

}
