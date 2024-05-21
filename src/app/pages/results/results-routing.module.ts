import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results.component';
import { IndividualComponent } from './individual/individual.component';
import { GlobalComponent } from './global/global.component';
import { PostIndividualComponent } from './post-individual/post-individual.component';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent,
    children: [
      {
        path: 'individual',
        component: IndividualComponent
      },
      {
        path: 'post-individual',
        component: PostIndividualComponent
      },
      {
        path: 'global',
        component: GlobalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
