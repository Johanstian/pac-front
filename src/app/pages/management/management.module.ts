import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { ManagementListComponent } from './management-list/management-list.component';
import { ManagementCreateComponent } from './management-create/management-create.component';
import { ManagementUpdateComponent } from './management-update/management-update.component';
import { CpdListComponent } from './cpd-list/cpd-list.component';
import { CpdCreateComponent } from './cpd-create/cpd-create.component';
import { CpdUpdateComponent } from './cpd-update/cpd-update.component';
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ",",
  precision: 0,
  prefix: "$ ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [
    ManagementComponent,
    ManagementListComponent,
    ManagementCreateComponent,
    ManagementUpdateComponent,
    CpdListComponent,
    CpdCreateComponent,
    CpdUpdateComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ThemeModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class ManagementModule { }
