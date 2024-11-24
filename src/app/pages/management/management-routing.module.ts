import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { ManagementListComponent } from './management-list/management-list.component';
import { ManagementCreateComponent } from './management-create/management-create.component';
import { CpdListComponent } from './cpd-list/cpd-list.component';
import { CpdCreateComponent } from './cpd-create/cpd-create.component';
import { CpdUpdateComponent } from './cpd-update/cpd-update.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'cdp-list',
        component: CpdListComponent
      },
      {
        path: 'cdp-create',
        component: CpdCreateComponent
      },
      {
        path: 'cdp-update/:id',
        component: CpdUpdateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
