import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUpComponent } from './follow-up.component';
import { PostPsychosocialComponent } from './post-psychosocial/post-psychosocial.component';
import { PostStrengthComponent } from './post-strength/post-strength.component';
import { PostPsychosocialUpdateComponent } from './post-psychosocial/post-psychosocial-update/post-psychosocial-update.component';
import { PostStrengthUpdateComponent } from './post-strength/post-strength-update/post-strength-update.component';
import { FollowUpListComponent } from './follow-up-list/follow-up-list.component';

const routes: Routes = [
  {
    path: '',
    component: FollowUpComponent,
    children: [
      {
        path: 'follow-up-list',
        component: FollowUpListComponent
      },
      {
        path: 'post-psychosocial',
        component: PostPsychosocialComponent
      },
      {
        path: 'post-psychosocial-update/:cc',
        component: PostPsychosocialUpdateComponent
      },
      {
        path: 'post-strength',
        component: PostStrengthComponent
      },
      {
        path: 'post-strength-update/:cc',
        component: PostStrengthUpdateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowUpRoutingModule { }
