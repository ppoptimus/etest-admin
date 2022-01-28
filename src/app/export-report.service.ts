import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './core/base/base-service';

@Injectable({
  providedIn: 'root'
})
export class ExportReportService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super('question/report', http);
  }

  getDifficult(id,type) {
    return this.http.get(`${this.fullUrl}/difficulty/${type}/${id}`);
  }

  getDifficultText(id,type) {
    return (`${this.fullUrl}/difficulty/${type}/${id}`);
  }

  getReliability(id,type) {
    return this.http.get(`${this.fullUrl}/reliability/${type}/${id}`);
  }

  getReliabilityText(id,type) {
    return (`${this.fullUrl}/reliability/${type}/${id}`);
  }

  getValidity(id,type) {
    return this.http.get(`${this.fullUrl}/validity/${type}/${id}`);
  }

  getValidityText(data,type) {
    return (`${this.fullUrl}/validity/${type}/${data}`);
  }


}
