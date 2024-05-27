import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';
import { PostPsychosocialComponent } from './post-psychosocial/post-psychosocial.component';
import { PostStrengthComponent } from './post-strength/post-strength.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { PostStrengthUpdateComponent } from './post-strength/post-strength-update/post-strength-update.component';
import { PostPsychosocialUpdateComponent } from './post-psychosocial/post-psychosocial-update/post-psychosocial-update.component';
import { FollowUpListComponent } from './follow-up-list/follow-up-list.component';


@NgModule({
  declarations: [
    FollowUpComponent,
    PostPsychosocialComponent,
    PostStrengthComponent,
    PostStrengthUpdateComponent,
    PostPsychosocialUpdateComponent,
    FollowUpListComponent
  ],
  imports: [
    CommonModule,
    FollowUpRoutingModule,
    ThemeModule,
    NbDatepickerModule,
    NbTimepickerModule,
  ]
})
export class FollowUpModule { }
