import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CoursesService } from 'src/app/courses.service';
import { OccupationGroupService } from 'src/app/occupation-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-log',
  templateUrl: './question-log.container.html',
  styleUrls: ['./question-log.container.scss']
})
export class QuestionLogContainer implements OnInit {
  occList$ = new Observable();
  questionList$ = new Observable();
  listBoolean = null;
  constructor(
    private snackbar: MatSnackBar,
    private courseSV: CoursesService,
    private occSV: OccupationGroupService
  ) { }

  ngOnInit(): void {
    // this.questionList$ = this.courseSV.getAll().pipe(map((x: any) => x.filter(x => x.is_send_approve !== true && x.no_of_topics != 0)));
    this.questionList$ = this.courseSV.getAll()
    this.occList$ = this.occSV.getAll()
  }

  onGetNonApp(){
    this.listBoolean = null;
    this.questionList$ = this.courseSV.getAll().pipe(map((x: any) => x.filter(x => x.is_send_approve !== true && x.no_of_topics != 0)));
  }

  onGetApp(){
    this.listBoolean = true;
    this.questionList$ = this.courseSV.getAll().pipe(map((x: any) => x.filter(x => x.is_send_approve === true && x.no_of_topics != 0)));
  }


  onSearchOc(val) {
    this.questionList$ = this.courseSV.getOc(val).pipe(
      catchError((err) => {
        this.error('ไม่พบข้อมูล')
        return throwError(err);
      })
    );
  }

  error(text: string){
    Swal.fire({
      title: text,
      icon: 'error',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }

  onSearch(data) {
    this.questionList$ = this.courseSV.search(`?course_name=${data}`)
  }
}
