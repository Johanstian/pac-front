import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UndertakeRoutingModule } from './undertake-routing.module';
import { UndertakeComponent } from './undertake.component';
import { ThemeModule } from 'src/app/theme/theme.module';


@NgModule({
  declarations: [
    UndertakeComponent
  ],
  imports: [
    CommonModule,
    UndertakeRoutingModule,
    ThemeModule
  ]
})
export class UndertakeModule { }
