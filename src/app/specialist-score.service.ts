import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistScoreService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('specialist_scores', http);
   }
}
