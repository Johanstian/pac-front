import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbTooltipModule,
  NbAutocompleteModule,
  NbBadgeModule,
  NbTagModule,
  NbSpinnerModule,
  NbAlertModule,
  NbPopoverModule,
  NbCardModule,
  NbButtonGroupModule,
  NbCheckboxModule,
  NbRadioModule,
  NbToggleModule,
  NbStepperModule,
  NbFormFieldModule,
  NbDatepickerDirective
} from '@nebular/theme';
import { FooterComponent, HeaderComponent } from './components';
import { OneColumnLayoutComponent } from './layouts/one-column/one-column.layout';
// import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
// import { OwnPipe } from '../core/pipes/Own.pipe';
// import { PhysicalStatusPipe } from '../core/pipes/physicalStatus.pipe';
// export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
//   align: "right",
//   allowNegative: true,
//   decimal: ",",
//   precision: 2,
//   prefix: "$ ",
//   suffix: "",
//   thousands: "."
// };


const ANGULAR_GENERALS = [FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbInputModule,
  NbTooltipModule,
  NbAutocompleteModule,
  NbBadgeModule,
  NbTagModule,
  NbSpinnerModule,
  NbAlertModule,
  NbPopoverModule,
  NbCardModule,
  NbButtonGroupModule,
  NbCheckboxModule,
  NbRadioModule,
  NbToggleModule,
  // CurrencyMaskModule
  NbStepperModule,
  NbFormFieldModule,
  NgbPaginationModule
];

// const NGB_MODULES = [NgbPaginationModule];

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  OneColumnLayoutComponent,
  ProgressBarComponent,
  // OwnPipe,
  // PhysicalStatusPipe
];

@NgModule({
  declarations: [...COMPONENTS, ProgressBarComponent],
  // imports: [CommonModule, ...NB_MODULES, ...NGB_MODULES, ...ANGULAR_GENERALS],
  imports: [CommonModule, ...NB_MODULES, ...ANGULAR_GENERALS],
  exports: [...NB_MODULES, ...COMPONENTS, ...ANGULAR_GENERALS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [
  //   { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  // ],
})
export class ThemeModule { }