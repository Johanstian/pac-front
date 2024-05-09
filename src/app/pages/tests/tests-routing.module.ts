import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './tests.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: TestsComponent,
    children: [
      {
        path: 'test1',
        component: Test1Component,
        canActivate: [RoleGuard],
        data: {role: ['Test1', 'Admin']}
      },
      {
        path: 'test2',
        component: Test2Component,
        canActivate: [RoleGuard],
        data: {role: ['Test2', 'Admin']}
      },
      {
        path: 'test3',
        component: Test3Component,
        canActivate: [RoleGuard],
        data: {role: ['Test3', 'Admin']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
