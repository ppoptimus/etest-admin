import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OccupationGroupService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('occupation_groups', http);
  }

  getCourse(id){
    return this.http.get(`${this.prefix}courses?occupation_group_id=${id}`)
  }
}
