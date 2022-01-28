import { QuestionV2RouterComponent } from './router/questionV2.router';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionContainer } from './container/question/question.container';
import { ListQuestionComponent } from './presenter/list/list-question/list-question.component';
import { SearchQuestionComponent } from './presenter/search/search-question/search-question.component';
const routes: Routes = [
  {
    path: '',
    component: QuestionV2RouterComponent,
    children: [
      {
        path: '',
        component: QuestionContainer,
      },
    ],
  },
];

@NgModule({
  declarations: [
    QuestionContainer,
    ListQuestionComponent,
    SearchQuestionComponent,
    QuestionV2RouterComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class QuestionV2Module {}
