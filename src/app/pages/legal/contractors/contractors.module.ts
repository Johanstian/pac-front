import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorsRoutingModule } from './contractors-routing.module';
import { ContractorsComponent } from './contractors.component';
import { ContractorsListComponent } from './contractors-list/contractors-list.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ContractorsCreateComponent } from './contractors-create/contractors-create.component';
import { ContractorsUpdateComponent } from './contractors-update/contractors-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContractorsComponent,
    ContractorsListComponent,
    ContractorsCreateComponent,
    ContractorsUpdateComponent
  ],
  imports: [
    CommonModule,
    ContractorsRoutingModule,
    ThemeModule,
    ReactiveFormsModule
  ]
})
export class ContractorsModule { }
