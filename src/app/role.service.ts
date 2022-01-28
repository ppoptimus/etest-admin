import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http: HttpClient) { }

  get() {
    return this.http.get('https://e-testing-mockup-api.71dev.com/api/roles');
  }

  post(data) {
    return this.http.post('https://e-testing-mockup-api.71dev.com/api/roles', data);
  }

  getid(id) {
    return this.http.get(`https://e-testing-mockup-api.71dev.com/api/roles/${id}`);
  }

  update(id, data) {
    return this.http.put(`https://e-testing-mockup-api.71dev.com/api/roles/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`https://e-testing-mockup-api.71dev.com/api/roles/${id}`);
  }

  login(data){
    return this.http.post(`https://e-testing-mockup-api.71dev.com/api/logins/login`,data);
  }
}
