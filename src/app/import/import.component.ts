import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { QuestionService } from '../question.service';
import { TopicsService } from '../topics.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  topicData;
  id;
  selectfile;
  log;
  url: string | ArrayBuffer;
  constructor(
    private topicSV: TopicsService,
    private route: ActivatedRoute,
    private questionSV: QuestionService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(tap((x: any) => (this.id = x.params.id)))
      .subscribe();
    this.topicSV
      .get(this.id)
      .pipe(tap((x) => (this.topicData = x)))
      .subscribe();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectfile = event.target.files[0];
    }
  }

  upload() {
    const formData: FormData = new FormData();
    formData.append('file', this.selectfile, this.selectfile.name);
    this.questionSV.upload1(this.id, formData)
    .pipe(catchError((err) => {
      this.error('มีข้อผิดพลาดในการนำเข้า')
      return throwError(err);
    })).subscribe((x: any) => {
      this.log = x;
      if(x.status == 'success'){
        this.success('นำเข้าสำเร็จ')
        window.history.back();
      }
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

  download(){
    let link = document.createElement("a")
    link.download = "Import"
    link.href = "assets/question_import.xlsx"
    link.click()
  }
}
