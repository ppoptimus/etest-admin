import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('choices', http);
   }
}
