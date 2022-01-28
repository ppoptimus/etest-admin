import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('specialists', http);
   }
   getid(id) {
    return this.http.get(`${this.prefix}/courses/${id}/specialists`);
  }
}
