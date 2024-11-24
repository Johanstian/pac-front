import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalComponent } from './legal.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { InvitationComponent } from './invitation/invitation.component';

const routes: Routes = [
  {
    path: '',
    component: LegalComponent,
    children:[
      {
        path: 'authorization',
        component: AuthorizationComponent
      },
      {
        path: 'contractors',
        loadChildren: () => import('./contractors/contractors.module').then(m => m.ContractorsModule)
      },
      {
        path: 'invitation',
        component: InvitationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
