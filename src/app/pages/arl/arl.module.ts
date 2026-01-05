import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArlRoutingModule } from './arl-routing.module';
import { ArlComponent } from './arl.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ArlAffiliationComponent } from './arl-affiliation/arl-affiliation.component';
import { ArlsComponent } from './arls/arls.component';
import { ArlUpdateComponent } from './arl-update/arl-update.component';
import { DeleteConfirmDialogComponent } from './arls/delete-confirm-dialog.component';


@NgModule({
  declarations: [
    ArlComponent,
    ArlAffiliationComponent,
    ArlsComponent,
    ArlUpdateComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    ArlRoutingModule,
    CommonModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule
  ]
})
export class ArlModule { }
