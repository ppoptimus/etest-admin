import { OccupationGroupService } from './../../../occupation-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from './../../../courses.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question',
  templateUrl: './question.container.html',
  styleUrls: ['./question.container.scss']
})
export class QuestionContainer implements OnInit {
  occList$ = new Observable();
  questionList$ = new Observable();
  listBoolean = null;
  constructor(
    private snackbar: MatSnackBar,
    private courseSV: CoursesService,
    private occSV: OccupationGroupService
  ) { }

  ngOnInit(): void {
    this.questionList$ = this.courseSV.getAll().pipe(map((x: any) => x.filter(x => x.is_send_approve !== true && x.no_of_topics != 0)));
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
      map((x: any) => x.filter(a => a.is_send_approve === this.listBoolean && x.no_of_topics != 0)),
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
    this.questionList$ = this.courseSV.search(`?course_name=${data}`).pipe(
      map((x: any) => x.filter(a => a.is_send_approve === this.listBoolean && x.no_of_topics != 0))
    );
  }

}
