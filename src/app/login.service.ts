import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  get() {
    return this.http.get('http://e-testing.dsd.go.th/mockup/logins');
  }

  getid(id) {
    return this.http.get(`http://e-testing.dsd.go.th/mockup/logins/${id}`);
  }

  login(data){
    return this.http.post('https://e-testing.dsd.go.th/api/admin/login', data);
  }


}
