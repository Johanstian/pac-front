import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorsComponent } from './contractors.component';
import { ContractorsListComponent } from './contractors-list/contractors-list.component';
import { ContractorsCreateComponent } from './contractors-create/contractors-create.component';
import { ContractorsUpdateComponent } from './contractors-update/contractors-update.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorsComponent,
    children: [
      {
        path: 'contractors-list',
        component: ContractorsListComponent
      },
      {
        path: 'contractors-create',
        component: ContractorsCreateComponent
      },
      {
        path: 'contractors-update/:documento',
        component: ContractorsUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorsRoutingModule { }
