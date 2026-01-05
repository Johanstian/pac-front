import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArlComponent } from './arl.component';
import { ArlAffiliationComponent } from './arl-affiliation/arl-affiliation.component';
import { ArlsComponent } from './arls/arls.component';
import { ArlUpdateComponent } from './arl-update/arl-update.component';

const routes: Routes = [
  {
    path: '',
    component: ArlComponent,
    children: [
      {
        path: 'arl-list',
        component: ArlsComponent
      },
      {
        path: 'arl-affiliation',
        component: ArlAffiliationComponent
      },
      {
        path: 'arl-update/:id',
        component: ArlUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArlRoutingModule { }
