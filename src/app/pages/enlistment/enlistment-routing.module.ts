import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnlistmentComponent } from './enlistment.component';
import { EnlistmentStageComponent } from './enlistment-stage/enlistment-stage.component';
import { PreEnlistmentStageComponent } from './pre-enlistment-stage/pre-enlistment-stage.component';
import { EnlistmentStageUpdateComponent } from './enlistment-stage/enlistment-stage-update/enlistment-stage-update.component';
import { InductionComponent } from './induction/induction.component';
import { InductionUpdateComponent } from './induction/induction-update/induction-update.component';
import { EnlistmentStagePermanentComponent } from './enlistment-stage-permanent/enlistment-stage-permanent.component';
import { EnlistmentStagePermanentUpdateComponent } from './enlistment-stage-permanent/enlistment-stage-permanent-update/enlistment-stage-permanent-update.component';
import { StrengthComponent } from './strength/strength.component';
import { StrengthUpdateComponent } from './strength/strength-update/strength-update.component';

const routes: Routes = [
  {
    path: '',
    component: EnlistmentComponent,
    children: [
      {
        path: 'enlistment-stage',
        component: EnlistmentStageComponent
      },
      {
        path: 'enlistment-stage-permanent',
        component: EnlistmentStagePermanentComponent
      },
      {
        path: 'enlistment-stage/:cc',
        component: EnlistmentStageUpdateComponent
      },
      {
        path: 'enlistment-stage-permanent/:cc',
        component: EnlistmentStagePermanentUpdateComponent
      },
      {
        path: 'pre-enlistment-stage',
        component: PreEnlistmentStageComponent
      },
      {
        path: 'induction',
        component: InductionComponent
      },
      {
        path: 'induction-update/:cc',
        component: InductionUpdateComponent
      },
      {
        path: 'strength',
        component: StrengthComponent
      },
      {
        path: 'strength-update/:cc',
        component: StrengthUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnlistmentRoutingModule { }
