import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService{

  constructor(public http: HttpClient) {
    super('admin', http);
   }

   getSummary(){
     return this.http.get(`https://e-testing.dsd.go.th/api/admin/summary`);
   }

   search(data){
    return this.http.get(`https://e-testing.dsd.go.th/api/admin/summary_course_detail${data}`);
  }

  getSummaryText(type){
    return (`${this.fullUrl}/report/summary/${type}`);
  }

  getSummaryDetailText(type,data){
    return (`${this.fullUrl}/report/summary_course_detail/${type}?${data}`);
  }

  //  validate(data){
  //    return this.http.post(`https://e-testing.dsd.go.th/reports/test_validity/pdf`, data);
  //  }
}
