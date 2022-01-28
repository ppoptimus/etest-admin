import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createQueryStringFromObject } from 'src/app/core/func/func';

@Component({
  selector: 'exam-result-search',
  templateUrl: './exam-result-search.component.html',
  styleUrls: ['./exam-result-search.component.scss']
})
export class ExamResultSearchComponent implements OnInit {
  @Output() search = new EventEmitter();
  query = {
    from_date: null,
    to_date: null,
    candidate_name: null,
    location_code: null
  };
  constructor() { }

  ngOnInit(): void {
  }

  onSearch(){
    const todate = formatDate(this.query.from_date, 'yyyy-MM-dd', 'en-US');
    this.query.to_date = todate;
    this.query.from_date = todate;
    const queryString = createQueryStringFromObject(this.query);
    this.search.emit(queryString);
  }

}
