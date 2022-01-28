import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateQuestionDialogComponent } from '../create-question-dialog/create-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicsService } from '../topics.service';
import { QuestionService } from '../question.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { CoursesService } from '../courses.service';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-question-deep-detail',
  templateUrl: './question-deep-detail.component.html',
  styleUrls: ['./question-deep-detail.component.scss'],
})
export class QuestionDeepDetailComponent implements OnInit {
  tableDisplayColumns: string[] = ['id', 'name', 'description'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  question;
  topic;
  topicid;
  courseid;
  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private topicsService: TopicsService,
    private router: Router,
    private sb: MatSnackBar,
    private courseSV: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result: any) => {
      {
        this.topicid = result.params.topicsTopic_id;
        this.courseid = result.params.courseCourse_id;
      }
      this.topicsService
        .query(`/${result.params.topicsTopic_id}`)
        .subscribe((a) => {
          this.topic = a;
        });
      this.questionService
        .getid(result.params.topicsTopic_id)
        .subscribe((b:any) => {
          this.question = b.map((x: any, index) => ({...x, index: index + 1}));
          this.question = new MatTableDataSource(this.question);
          this.question.paginator = this.paginator;
        });
    });
  }
  openCreateQuestionDialog(question, topic) {
    const dialogRef = this.dialog.open(CreateQuestionDialogComponent, {
      width: '500px',
      height: '330px',
      data: {
        title: 'Update',
        message: 'Update',
        questionData: question,
        topicData: topic,
      },
    });
  }

  deletequestion(id) {
    Swal.fire({
      title: 'คุณต้องการลบคำถามนี้ใช่ไหม?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      this.router.navigate([`/question/${this.courseid}/${this.topicid}`]);
      if (result.isConfirmed) {
        Swal.fire(
          'ลบเรียบร้อยแล้ว',
          '',
          'success'
        ).then((x) => {
          if(x.isConfirmed){
            let courseData;
            this.questionService.deleteDate(id).pipe(
              concatMap(x => this.courseSV.get(this.courseid)),
              tap(x => courseData = x),
              tap(x => courseData.is_approve = courseData.topics.every((x) => x.is_use === true)),
              ).subscribe(x => window.location.reload())
          }
        })
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.question.filter = filterValue.trim().toLowerCase();
  }
  back() {
    this.router.navigate([`/question/${this.courseid}`]);
  }
  edit(i) {
    this.router.navigate(['/question/edit', i]);
  }
}
