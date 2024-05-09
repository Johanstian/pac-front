import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ThemeModule } from '../theme/theme.module';


@NgModule({
  declarations: [
    SecurityComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ThemeModule
  ]
})
export class SecurityModule { }
