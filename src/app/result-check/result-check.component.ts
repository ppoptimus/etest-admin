import { CoursesService } from 'src/app/courses.service';
import { DrawerService } from './../drawer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestioncheckService } from '../questioncheck.service';
import { TopicsService } from '../topics.service';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-result-check',
  templateUrl: './result-check.component.html',
  styleUrls: ['./result-check.component.scss'],
})
export class ResultCheckComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private questioncheckService: QuestioncheckService,
    private topicService: TopicsService,
    private drawerSV: DrawerService,
    private courseSV: CoursesService,
    private router: Router
  ) {}
  check;
  end;
  courseData;
  button = 'yes';
  topic;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.questioncheckService
        .get(`start/${params.get('topicsTopic_id')}`)
        .subscribe((result) => {
          this.check = result;
          this.questioncheckService.end(this.check).subscribe((data) => {
            this.end = data;
          });
          this.topicService.get(params.get('topicsTopic_id')).subscribe((x) => {
            this.topic = x;
          });
        });
    });
  }

   confirm() {
    this.topic.is_approve = true;
    this.topic.no_of_suspend = this.end.total_suspends;
    const id = this.topic.topic_id;
    this.topicService.update(id, this.topic)
    .pipe(concatMap(x => this.courseSV.get(this.topic.course_id)),
    tap(x => this.courseData = x),
    tap(x => this.courseData.is_approve = this.courseData.topics.every((x) => x.is_approve === true)),
    concatMap(x => this.courseSV.update(this.courseData.course_id, this.courseData)))
    .subscribe(x => this.router.navigate([`check/${this.topic.course_id}`]));
  }


  toggle() {
    this.drawerSV.toggle();
  }
}
