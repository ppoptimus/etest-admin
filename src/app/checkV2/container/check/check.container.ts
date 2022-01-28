import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CoursesService } from 'src/app/courses.service';
import { OccupationGroupService } from 'src/app/occupation-group.service';
import { QuestionService } from 'src/app/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check',
  templateUrl: './check.container.html',
  styleUrls: ['./check.container.scss'],
})
export class CheckContainer implements OnInit {
  checkList$ = new Observable();
  occList$ = new Observable();
  listBoolean = null;
  isCheckQuestion = false;
  constructor(
    private courseSV: CoursesService,
    private snackbar: MatSnackBar,
    private occSV: OccupationGroupService,
    private questionSV: QuestionService
  ) {}

  ngOnInit(): void {
    this.checkList$ = this.courseSV
      .getAll()
      .pipe(
        map((x: any) =>
          x.filter((a) => a.is_send_approve === true && a.is_use !== false)
        )
      );
    this.occList$ = this.occSV.getAll();
  }

  check() {
    this.listBoolean = null;
    this.isCheckQuestion = false;
    this.checkList$ = this.courseSV
      .getAll()
      .pipe(
        map((x: any) =>
          x.filter((a) => a.is_send_approve === true && a.is_use !== false)
        )
      );
  }

  checkSuspend() {
    this.isCheckQuestion = false;
    this.listBoolean = false;
    this.checkList$ = this.courseSV.getAll().pipe(
      map((x: any) => x.filter((x) => x.is_use === false))
    );
  }

  cancelQuestion(data){
    data.is_approve = null;
    data.remark = null;
    const id = data.question_id;
    this.questionSV.update(id, data).pipe(catchError((err) => {
      this.error('มีข้อผิดพลาดในการระงับ')
      return throwError(err);
    })).subscribe(() => {
      this.success('ยกเลิกระงับสำเร็จ')
      window.location.reload();
    })
  }

  cancelSuspend(data) {
    const id = data.course_id;
    let newData;
    this.courseSV.get(data.course_id).subscribe(x => {
      newData = x
      newData.is_use = null;
      this.courseSV
      .update(id, newData)
      .pipe(
        catchError((err) => {
          this.error('มีข้อผิดพลาดในการระงับ')
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.success('ยกเลิกระงับสำเร็จ')
        window.location.reload();
      });
    })
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

  searchOc(val) {
    if( this.isCheckQuestion == false) {
      if(this.listBoolean == null) {
        this.checkList$ = this.courseSV.getOc(val).pipe(
          map((x: any) => x.filter(a => a.is_send_approve === true && a.is_use !== false)),
          catchError((err) => {
            this.snackbar.open('ไม่พบข้อมูล', '', {
              duration: 1000,
            });
            return throwError(err);
          })
        );
      } else {
        this.checkList$ = this.courseSV.getOc(val).pipe(
          map((x: any) => x.filter(a => a.is_send_approve === true && a.is_use === this.listBoolean)),
          catchError((err) => {
            this.snackbar.open('ไม่พบข้อมูล', '', {
              duration: 1000,
            });
            return throwError(err);
          })
        );
      }
    }
  }

  filter(data) {
    if(this.isCheckQuestion == false){
      if(this.listBoolean == null) {
        this.checkList$ = this.courseSV
        .search(`?course_name=${data}`)
        .pipe(
          map((x: any) =>
            x.filter((a) => a.is_send_approve === true && a.is_use !== false)
          )
        );
      } else {
        this.checkList$ = this.courseSV
        .search(`?course_name=${data}`)
        .pipe(
          map((x: any) =>
            x.filter((a) => a.is_send_approve === true && a.is_use === this.listBoolean)
          )
        );
      }
    } else {
      this.checkList$ = this.questionSV.search(data)
    }
  }

  checkChoice(){
    this.isCheckQuestion = true;
    this.checkList$ = this.questionSV.getAll().pipe(
      map((x: any) => x.filter((a: any) => a.is_approve === false)));
  }

}
