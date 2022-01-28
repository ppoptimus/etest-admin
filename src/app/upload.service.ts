import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('upload', http);
   }
}
