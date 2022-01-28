import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionLogContainer } from './container/question-log/question-log.container';
import { QuestionLogRouter } from './router/question-log.router';
import { QuestionLogListComponent } from './presenter/list/question-log-list/question-log-list.component';
import { QuestionLogInfoComponent } from './presenter/question_info/question-log-info/question-log-info.component';
import { QuestionLogSearchComponent } from './presenter/search/question-log-search/question-log-search.component';
import { QuestionLogSecondListComponent } from './presenter/second_list/question-log-second-list/question-log-second-list.component';
import { QuestionLogThirdListComponent } from './presenter/third_list/question-log-third-list/question-log-third-list.component';
import { QuestionInfoDialogComponent } from './presenter/question-info-dialog/question-info-dialog.component';
const routes: Routes = [
  {
    path: '',
    component: QuestionLogRouter,
    children: [
      {
        path: '',
        component: QuestionLogContainer,
      },
      {
        path: ':course_id',
        component: QuestionLogSecondListComponent,
      },
      {
        path: ':course_id/:topic_id',
        component: QuestionLogThirdListComponent,
      },
      {
        path: 'audit/:question_id',
        component: QuestionLogThirdListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    QuestionLogContainer,
    QuestionLogRouter,
    QuestionLogListComponent,
    QuestionLogInfoComponent,
    QuestionLogSearchComponent,
    QuestionLogSecondListComponent,
    QuestionLogThirdListComponent,
    QuestionInfoDialogComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class QuestionLogModule {}
