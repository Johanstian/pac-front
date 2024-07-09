import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UndertakeComponent } from './undertake.component';

const routes: Routes = [
  {
    path: '',
    component: UndertakeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UndertakeRoutingModule { }
