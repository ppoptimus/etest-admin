import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRouter } from './router/report.router';
import { ReportContainer } from './container/report/report.container';
import { ReportSearchComponent } from './presenter/search/report-search/report-search.component';
import { ReportListComponent } from './presenter/list/report-list/report-list.component';
import { MaterialModule } from '../material.module';
import { SearchListComponent } from './presenter/search-list/search-list/search-list.component';
const routes: Routes = [
  {
    path: '',
    component: ReportRouter,
    children: [
      {
        path: '',
        component: ReportContainer,
      },
    ],
  },
];

@NgModule({
  declarations: [ReportContainer, ReportSearchComponent, ReportListComponent, ReportRouter, SearchListComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class ReportModuleComponent {}
