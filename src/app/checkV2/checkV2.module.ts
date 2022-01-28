import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckContainer } from './container/check/check.container';
import { CheckV2RouterComponent } from './router/checkV2.router';
import { SearchCheckComponent } from './presenter/search/search-check/search-check.component';
import { ListCheckComponent } from './presenter/list/list-check/list-check.component';
const routes: Routes = [
  {
    path: '',
    component: CheckV2RouterComponent,
    children: [
      {
        path: '',
        component: CheckContainer,
      },
    ],
  },
];

@NgModule({
  declarations: [CheckV2RouterComponent, CheckContainer, SearchCheckComponent, ListCheckComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class CheckModule {}
