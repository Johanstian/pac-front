import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetestsRoutingModule } from './retests-routing.module';
import { RetestsComponent } from './retests.component';
import { Retest1Component } from './retest1/retest1.component';
import { Retest2Component } from './retest2/retest2.component';
import { Retest3Component } from './retest3/retest3.component';
import { ThemeModule } from 'src/app/theme/theme.module';


@NgModule({
  declarations: [
    RetestsComponent,
    Retest1Component,
    Retest2Component,
    Retest3Component
  ],
  imports: [
    CommonModule,
    RetestsRoutingModule,
    ThemeModule
  ]
})
export class RetestsModule { }
