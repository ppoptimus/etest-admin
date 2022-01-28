import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('courses', http);
  }
  getapprove() {
    return this.http.get('https://e-testing.dsd.go.th/api/courses?is_approve=true');
  }

  getnonapprove() {
    return this.http.get('https://e-testing.dsd.go.th/api/courses?is_approve=null' );
  }

  getOc(id) {
    return this.http.get(`https://e-testing.dsd.go.th/api/courses?occupation_group_id=${id}`);
  }

  search(query){
    return this.http.get(`https://e-testing.dsd.go.th/api/courses${query}`);
  }

  getQ(id){
    return this.http.get(`https://e-testing.dsd.go.th/api/courses?course_id=${id}`);
  }
}
