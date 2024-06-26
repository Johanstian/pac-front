import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnlistmentRoutingModule } from './enlistment-routing.module';
import { EnlistmentComponent } from './enlistment.component';
import { EnlistmentStageComponent } from './enlistment-stage/enlistment-stage.component';
import { PreEnlistmentStageComponent } from './pre-enlistment-stage/pre-enlistment-stage.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnlistmentStageUpdateComponent } from './enlistment-stage/enlistment-stage-update/enlistment-stage-update.component';
import { InductionComponent } from './induction/induction.component';
import { InductionUpdateComponent } from './induction/induction-update/induction-update.component';
import { EnlistmentStagePermanentComponent } from './enlistment-stage-permanent/enlistment-stage-permanent.component';
import { EnlistmentStagePermanentUpdateComponent } from './enlistment-stage-permanent/enlistment-stage-permanent-update/enlistment-stage-permanent-update.component';
import { PdfComponent } from './induction/pdf/pdf.component';
import { StrengthComponent } from './strength/strength.component';
import { StrengthUpdateComponent } from './strength/strength-update/strength-update.component';
import { UpdateInterviewComponent } from './pre-enlistment-stage/update-interview/update-interview.component';


@NgModule({
  declarations: [
    EnlistmentComponent,
    EnlistmentStageComponent,
    PreEnlistmentStageComponent,
    EnlistmentStageUpdateComponent,
    InductionComponent,
    InductionUpdateComponent,
    EnlistmentStagePermanentComponent,
    EnlistmentStagePermanentUpdateComponent,
    PdfComponent,
    StrengthComponent,
    StrengthUpdateComponent,
    UpdateInterviewComponent
  ],
  imports: [
    CommonModule,
    EnlistmentRoutingModule,
    FormsModule,
    NbDatepickerModule,
    NbTimepickerModule,
    ReactiveFormsModule,
    ThemeModule
  ]
})
export class EnlistmentModule { }
