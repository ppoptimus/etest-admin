import { DrawerService } from './drawer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CourseComponent } from './course/course.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { CreateQuestionDialogComponent } from './create-question-dialog/create-question-dialog.component';
import { CreateCourseDialogComponent } from './create-course-dialog/create-course-dialog.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { AddPermisionDialogComponent } from './add-permision-dialog/add-permision-dialog.component';
import { CheckDetailComponent } from './check-detail/check-detail.component';
import { QuestionDeepDetailComponent } from './question-deep-detail/question-deep-detail.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { SettingComponent } from './setting/setting.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ImportComponent } from './import/import.component';
import { AddMatchQuestionComponent } from './add-match-question/add-match-question.component';
import { CheckTestEngineComponent } from './check-test-engine/check-test-engine.component';
import { ResultCheckComponent } from './result-check/result-check.component';
import { SuspendDialogComponent } from './suspend-dialog/suspend-dialog.component';
import { SettingUpdateDialogComponent } from './setting-update-dialog/setting-update-dialog.component';
import { ReportAnalysisComponent } from './report-analysis/report-analysis.component';
import { ExportDialogComponent } from './export-dialog/export-dialog.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportTrustComponent } from './report-trust/report-trust.component';
import { ReportLevelComponent } from './report-level/report-level.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { PersonInfoDialogComponent } from './person-info-dialog/person-info-dialog/person-info-dialog.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout/login-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout/main-layout.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog/upload-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog/view-dialog.component';
import { ShowPictureComponent } from './show-picture/show-picture.component';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { TokenIntercepterInterceptor } from './token-interceptor/token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    ConfirmDialogComponent,
    UpdateDialogComponent,
    LoginComponent,
    HomeComponent,
    CreateQuestionDialogComponent,
    CreateCourseDialogComponent,
    QuestionDetailComponent,
    SuccessDialogComponent,
    AddPermisionDialogComponent,
    CheckDetailComponent,
    QuestionDeepDetailComponent,
    AddQuestionComponent,
    SettingComponent,
    ImportComponent,
    AddMatchQuestionComponent,
    CheckTestEngineComponent,
    ResultCheckComponent,
    SuspendDialogComponent,
    SettingUpdateDialogComponent,
    ReportAnalysisComponent,
    ExportDialogComponent,
    ReportFormComponent,
    ReportTrustComponent,
    ReportLevelComponent,
    EditQuestionComponent,
    PersonInfoDialogComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    UploadDialogComponent,
    ViewDialogComponent,
    ShowPictureComponent,
    QuestionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgMaterialMultilevelMenuModule,
    // FlexLayoutModule,
    EditorModule,

  ],
  providers: [
    AuthService,
    AuthGuard,
    DrawerService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenIntercepterInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  // Open new component, any where
  // entryComponents: [
  //   ConfirmDialogComponent,
  //   UpdateDialogComponent,
  //   CreateQuestionDialogComponent,
  //   CreateCourseDialogComponent
  // ]
})
export class AppModule { }
