import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { IndividualComponent } from './individual/individual.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GlobalComponent } from './global/global.component';
import { PostIndividualComponent } from './post-individual/post-individual.component';


@NgModule({
  declarations: [
    ResultsComponent,
    IndividualComponent,
    GlobalComponent,
    PostIndividualComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    ThemeModule,
    NgxChartsModule
  ]
})
export class ResultsModule { }
