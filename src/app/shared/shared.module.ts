import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FORMLY_CONFIG, SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from './directives';
import { MaterialModule } from './material';
import { SHARED_PIPES } from './pipes';
import { IconService, SHARED_SERVICES } from './services';

export const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  MaterialModule,
];
@NgModule({
  declarations: [...SHARED_DIRECTIVES, ...SHARED_COMPONENTS, ...SHARED_PIPES],
  imports: [
    ...SHARED_MODULES,
    FormlyMaterialModule,
    FormlyModule.forRoot(FORMLY_CONFIG),
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
    ...SHARED_MODULES,
    ...SHARED_DIRECTIVES,
  ],
  providers: [SHARED_SERVICES],
})
export class SharedModule {
  constructor(private iconService: IconService) {
    this.iconService.load();
  }
}
