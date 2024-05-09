import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { ThemeModule } from 'src/app/theme/theme.module';


@NgModule({
  declarations: [
    TestsComponent,
    Test1Component,
    Test2Component,
    Test3Component
  ],
  imports: [
    CommonModule,
    TestsRoutingModule,
    ThemeModule
  ]
})
export class TestsModule { }
