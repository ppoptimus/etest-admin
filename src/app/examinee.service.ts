import { HttpClient } from '@angular/common/http';
import { BaseService } from './core/base/base-service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExamineeService extends BaseService {
  role;
  constructor(
    public http: HttpClient,
    private authService: AuthService
  ) {
    super('invigilator/examinees', http);
  }

  getTestId(id){
    return this.http.get(`https://e-testing.dsd.go.th/api/admin/result/${id}`);
  }

  getExamineeData(id){
    return this.http.get(`https://e-testing.dsd.go.th/api/candidates?citizen_id=${id}`)
  }

//   getAllwithlocationcode(data){
//     this.role = this.authService.currentUserValue;
//     return this.http.get(`https://e-testing.dsd.go.th/api/admin/finish?location_code=${this.role.location_code}&${data}`);
//  }

  getAllwithlocationcode(data){
    return this.http.get(`https://e-testing.dsd.go.th/api/admin/finish?${data}`);
  }
}
