import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetestsComponent } from './retests.component';
import { Retest1Component } from './retest1/retest1.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { Retest2Component } from './retest2/retest2.component';
import { Retest3Component } from './retest3/retest3.component';

const routes: Routes = [
  {
    path: '',
    component: RetestsComponent,
    children: [
      {
        path: 'retest1',
        component: Retest1Component,
        canActivate: [RoleGuard],
        data: {role: ['Post1', 'Admin']}
      },
      {
        path: 'retest2',
        component: Retest2Component,
        canActivate: [RoleGuard],
        data: {role: ['Post2', 'Admin']}
      },
      {
        path: 'retest3',
        component: Retest3Component,
        canActivate: [RoleGuard],
        data: {role: ['Post3', 'Admin']}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetestsRoutingModule { }
