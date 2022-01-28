import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReportAllContainer } from './container/report-all/report-all.container';
import { SearchReportAllComponent } from './presenter/search/search-report-all/search-report-all.component';
import { ReportAllListComponent } from './presenter/list/report-all-list/report-all-list.component';
import { ReportAllRouter } from './router/report-all.router';
const routes: Routes = [
  {
    path: '',
    component: ReportAllRouter,
    children: [
      {
        path: '',
        component: ReportAllContainer,
      },
    ],
  },
];

@NgModule({
  declarations: [ReportAllContainer, SearchReportAllComponent, ReportAllListComponent, ReportAllRouter],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class ReportAllModule {}
