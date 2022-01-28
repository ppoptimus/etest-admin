import { formatDate } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { createQueryStringFromObject } from 'src/app/core/func/func';
import { ReportService } from 'src/app/report.service';

@Component({
  selector: 'report-search',
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit {
  @Output() search = new EventEmitter()
  @Output() locationSearch = new EventEmitter()
  locationData;
  query = {
    from_date: null,
    to_date: null,
    location_code: null
  }
  constructor(
    private reportSV: ReportService
  ) { }

  ngOnInit(): void {
    this.reportSV.getSummary().subscribe(x => this.locationData = x)
  }

  onSearch(){
    if(this.query.from_date != null){
      this.query.from_date = formatDate(this.query.from_date,'yyyy-MM-dd','en-US')
    } else {
      this.query.from_date = null
    }

    if(this.query.from_date != null){
      this.query.to_date = formatDate(this.query.to_date,'yyyy-MM-dd','en-US')
    } else {
      this.query.to_date = null
    }
    let qurtyString = createQueryStringFromObject(this.query);
    this.search.emit(qurtyString);
  }

}
