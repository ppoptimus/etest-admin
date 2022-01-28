import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('candidates', http);
   }
}
