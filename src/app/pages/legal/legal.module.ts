import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalComponent } from './legal.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { InvitationComponent } from './invitation/invitation.component';


@NgModule({
  declarations: [
    LegalComponent,
    AuthorizationComponent,
    InvitationComponent,
  ],
  imports: [
    CommonModule,
    LegalRoutingModule,
    ThemeModule
  ]
})
export class LegalModule { }
