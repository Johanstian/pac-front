import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArlComponent } from './arl.component';
import { ArlAffiliationComponent } from './arl-affiliation/arl-affiliation.component';
import { ArlsComponent } from './arls/arls.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArlRoutingModule { }
