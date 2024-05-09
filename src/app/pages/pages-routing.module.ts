import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'arl',
        loadChildren: () => import('./arl/arl.module').then(m => m.ArlModule)
      },
      {
        path: 'enlistment',
        loadChildren: () => import('./enlistment/enlistment.module').then(m => m.EnlistmentModule)
      },
      {
        path: 'results',
        loadChildren: () => import('./results/results.module').then(m => m.ResultsModule)
      },
      {
        path: 'tests',
        loadChildren: () => import('./tests/tests.module').then(m => m.TestsModule)
      },
      {
        path: '**', pathMatch: 'full', redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
