import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicsService extends BaseService{

  constructor(public http: HttpClient)
  {
    super('topics', http);
  }
  getid(id) {
    return this.http.get(`${this.prefix}courses/${id}/topics`);
  }
}
