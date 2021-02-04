import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FORMLY_CONFIG, SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from './directives';
import { SHARED_PIPES } from './pipes';
import { IconService, SHARED_SERVICES } from './services';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatTabsModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
];

export const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  ...MATERIAL_MODULES,
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
