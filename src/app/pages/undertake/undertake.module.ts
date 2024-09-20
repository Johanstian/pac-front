import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UndertakeRoutingModule } from './undertake-routing.module';
import { UndertakeComponent } from './undertake.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { NbDatepickerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UndertakeComponent
  ],
  imports: [
    CommonModule,
    UndertakeRoutingModule,
    ThemeModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UndertakeModule { }
