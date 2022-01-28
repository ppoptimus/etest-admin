import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createQueryStringFromObject } from 'src/app/core/func/func';
import { CoursesService } from 'src/app/courses.service';
import { OccupationGroupService } from 'src/app/occupation-group.service';

@Component({
  selector: 'search-report-all',
  templateUrl: './search-report-all.component.html',
  styleUrls: ['./search-report-all.component.scss']
})
export class SearchReportAllComponent implements OnInit {
  @Output() search = new EventEmitter();
  @Output() report = new EventEmitter();
  reports = [
    { name: 'ความเที่ยงตรง', value: '1' },
    { name: 'ความเชื่อมั่น', value: '2' },
    { name: 'ความยากง่าย', value: '3' },
  ];
  occu;
  course;
  query = {
    from_date : null,
    to_date : null,
    occupation_group_id: null,
    course_id : null
  }
  constructor(
    private occuService: OccupationGroupService,
    private courseSV: CoursesService
  ) { }

  ngOnInit(): void {
    this.occuService.getAll().subscribe((a) => {
      this.occu = a;
    });

    // this.courseSV.getAll().subscribe((result) => {
    //   this.course = result;
    // });
  }

  setCourse(event){
    this.occuService.getCourse(event.source.value).subscribe(x => this.course = x)
  }

  onSearch(){
    if(this.query.from_date != null){
      this.query.from_date = formatDate(this.query.from_date, 'yyyy-MM-dd', 'en-US');
    } else {
      this.query.from_date = null;
    }

    if(this.query.from_date != null){
      this.query.to_date = formatDate(this.query.to_date, 'yyyy-MM-dd', 'en-US');
    } else {
      this.query.to_date = null;
    }
    let qurtyString = createQueryStringFromObject(this.query);
    this.search.emit(qurtyString);
  }

  onReportType(event){
    this.report.emit(event);
  }

}
