import { AddPermRouterComponent } from './router/add-perm-router.component';
import { MaterialModule } from './../material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionContainer } from './container/permission/permission.container';
import { PermSearchComponent } from './presenter/search/perm-search/perm-search.component';
import { PermListComponent } from './presenter/list/perm-list/perm-list.component';
const routes: Routes = [
  {
    path: '',
    component: AddPermRouterComponent,
    children: [
      {
        path: '',
        component: PermissionContainer,
      },

    ],
  },
];

@NgModule({
  declarations: [
  AddPermRouterComponent,
  PermissionContainer,
  PermSearchComponent,
  PermListComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class AddPermissionModule {}
