import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { CoursesService } from 'src/app/courses.service';
import { CreateQuestionDialogComponent } from 'src/app/create-question-dialog/create-question-dialog.component';
import { QuestionService } from 'src/app/question.service';
import { TopicsService } from 'src/app/topics.service';
import Swal from 'sweetalert2';
import { QuestionLogInfoComponent } from '../../question_info/question-log-info/question-log-info.component';

@Component({
  selector: 'app-question-log-third-list',
  templateUrl: './question-log-third-list.component.html',
  styleUrls: ['./question-log-third-list.component.scss']
})
export class QuestionLogThirdListComponent implements OnInit {
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
        this.topicid = result.params.topic_id;
        this.courseid = result.params.course_id;
      }
      this.topicsService
        .query(`/${result.params.topic_id}`)
        .subscribe((a) => {
          this.topic = a;
        });
      this.questionService
        .getid(result.params.topic_id)
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

  log(id) {
    this.questionService.audit(id).subscribe(x => {
      const dialogRef = this.dialog.open(QuestionLogInfoComponent, {
        width: '600px', height: '550px',
        data: x,
        backdropClass: 'backdropBackground'
      });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.question.filter = filterValue.trim().toLowerCase();
  }
  back() {
    this.router.navigate([`/question-log/${this.courseid}`]);
  }
  edit(i) {
    this.router.navigate(['/question/edit', i]);
  }
}
