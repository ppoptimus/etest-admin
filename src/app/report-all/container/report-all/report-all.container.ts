import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-report-all',
  templateUrl: './report-all.container.html',
  styleUrls: ['./report-all.container.scss']
})
export class ReportAllContainer implements OnInit {
  reportList$ = new Observable()
  reportType;
  constructor(
    private courseSV: CoursesService
  ) { }

  ngOnInit(): void {
  }

  onSearch(qurtyString: string){
    if (qurtyString) {
      return this.reportList$ = this.courseSV.search(`?${qurtyString}`)
    }
    if (!qurtyString) {
      return this.reportList$ = this.courseSV.getAll()
    }
  }

  onReportType(data){
    this.reportType = data;
  }

}
