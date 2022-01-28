import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { OccupationGroupService } from '../occupation-group.service';
interface Report {
  value: string;
  name: string;
}
@Component({
  selector: 'app-report-analysis',
  templateUrl: './report-analysis.component.html',
  styleUrls: ['./report-analysis.component.scss'],
})
export class ReportAnalysisComponent implements OnInit {
  table: string[] = ['course', 'level', 'info'];
  reports: Report[] = [
    { name: 'ความเที่ยงตรง', value: '1' },
    { name: 'ความเชื่อมั่น', value: '2' },
    { name: 'ความยากง่าย', value: '3' },
  ];
  course;
  occu;
  constructor(
    private courseService: CoursesService,
    private occuService: OccupationGroupService
  ) {}

  ngOnInit(): void {
    this.occuService.getAll().subscribe((a) => {
      this.occu = a;
    });
    this.courseService.getAll().subscribe((result) => {
      this.course = result;
    });
  }
}
