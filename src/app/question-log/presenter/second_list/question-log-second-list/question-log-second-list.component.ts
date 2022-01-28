import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CoursesService } from 'src/app/courses.service';
import { OccupationGroupService } from 'src/app/occupation-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-log-second-list',
  templateUrl: './question-log-second-list.component.html',
  styleUrls: ['./question-log-second-list.component.scss']
})
export class QuestionLogSecondListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  courses;
  occupation;
  createForm;
  coursedata;
  displayData;
  isQuestion;
  private unSubAll$ = new Subject<boolean>();
  tableDisplayColumns: string[] = [
    'id',
    'name',
    'questions',
    'topics',
    'description',
  ];
  constructor(
    private coursesService: CoursesService,
    private occupationService: OccupationGroupService,
    private route: ActivatedRoute,
    private sb: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.coursesService
        .get(+params.get('course_id'))
        .subscribe((result) => {
          this.courses = result;
          this.isQuestion = this.courses.topics.some(x => x.no_of_choices + x.no_of_matchings == 0);
          this.displayData = [...this.courses.topics]
          this.displayData = new MatTableDataSource(this.displayData)
          this.displayData.paginator = this.paginator;
        });
    });
    this.occupationService.getAll().subscribe(result => {this.occupation = result; });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayData.filter = filterValue.trim().toLowerCase();
  }
  back(){
    this.unSubAll$.next(true);
    window.history.back();
  }

  send(){
    this.route.paramMap.subscribe((params) => {
      this.coursesService
        .get(+params.get('coursesCourse_id'))
        .subscribe((result) => {
          this.unSubAll$.next(true);
          this.coursedata = result;
          this.coursedata.is_send_approve = true;
          this.coursesService.update(this.coursedata.course_id, this.coursedata).subscribe(x => {
            this.success('ส่งให้ตรวจสอบเรียบร้อยแล้ว')
            this.router.navigate([`question`]);
          });
        });
    });
  }

  success(text: string){
    Swal.fire({
      title: text,
      icon: 'success',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }

  error(text: string){
    Swal.fire({
      title: text,
      icon: 'error',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }

}
