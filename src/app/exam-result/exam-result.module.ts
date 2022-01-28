import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamResultContainer } from './container/exam-result/exam-result.container';
import { ExamResultListComponent } from './presenter/list/exam-result-list/exam-result-list.component';
import { ExamResultSearchComponent } from './presenter/search/exam-result-search/exam-result-search.component';
import { ExamResultRouter } from './router/exam-result.router';
import { ExamResultInfoComponent } from './presenter/info/exam-result-info/exam-result-info.component';
import { ExamTopicListComponent } from './presenter/topic-list/exam-topic-list/exam-topic-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExamResultRouter,
    children: [
      {
        path: '',
        component: ExamResultContainer,
      },
      {
        path: ':id',
        component: ExamResultInfoComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ExamResultContainer,
    ExamResultListComponent,
    ExamResultRouter,
    ExamResultSearchComponent,
    ExamResultInfoComponent,
    ExamTopicListComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class ExamResultModule {}
