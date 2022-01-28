import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { CheckDetailComponent } from './check-detail/check-detail.component';
import { QuestionDeepDetailComponent } from './question-deep-detail/question-deep-detail.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { SettingComponent } from './setting/setting.component';
import { AddMatchQuestionComponent } from './add-match-question/add-match-question.component';
import { CheckTestEngineComponent } from './check-test-engine/check-test-engine.component';
import { ResultCheckComponent } from './result-check/result-check.component';
import { ImportComponent } from './import/import.component';
import { ReportAnalysisComponent } from './report-analysis/report-analysis.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'course', component: CourseComponent },
      { path: 'home', component: HomeComponent },
      { path: 'question/:coursesCourse_id', component: QuestionDetailComponent,},
      { path: 'question/edit/:question_id', component: EditQuestionComponent },
      { path: 'check/:coursesCourse_id', component: CheckDetailComponent },
      { path: 'question/:courseCourse_id/:topicsTopic_id', component: QuestionDeepDetailComponent,     },
      { path: 'addquestion/:courseCourse_id/:topicsTopic_id', component: AddQuestionComponent,},
      { path: 'addmatchquestion/:courseCourse_id/:topicsTopic_id', component: AddMatchQuestionComponent,},
      { path: 'setting', component: SettingComponent },
      { path: 'check/:coursesCourse_id/:topicsTopic_id', component: CheckTestEngineComponent,},
      { path: 'import/:id', component: ImportComponent },
      { path: 'analysis_report', component: ReportAnalysisComponent },
      { path: 'report/report_form', component: ReportFormComponent },
      {
        path: 'report-all',
        loadChildren: () =>
          import('./report-all/report-all.module').then((m) => m.ReportAllModule),
      },
      {
        path: 'exam-result',
        loadChildren: () =>
          import('./exam-result/exam-result.module').then((m) => m.ExamResultModule),
      },
      {
        path: 'check',
        loadChildren: () =>
          import('./checkV2/checkV2.module').then((m) => m.CheckModule),
      },
      {
        path: 'question',
        loadChildren: () =>
          import('./questionV2/questionV2.module').then(
            (m) => m.QuestionV2Module
          ),
      },
      {
        path: 'question-log',
        loadChildren: () =>
          import('./question-log/question-log.module').then(
            (m) => m.QuestionLogModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./report/report.module').then(
            (m) => m.ReportModuleComponent
          ),
      },
      { path: 'result/:topicsTopic_id', component: ResultCheckComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
