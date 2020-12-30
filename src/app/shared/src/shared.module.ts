import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SHARED_COMPONENTS } from './components';

import { SHARED_PIPES } from './pipes';
import { IconService, SHARED_SERVICES } from './services';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
];

export const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  ...MATERIAL_MODULES,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS, ...SHARED_PIPES],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_COMPONENTS, ...SHARED_PIPES, ...SHARED_MODULES],
  providers: [SHARED_SERVICES],
})
export class SharedModule {
  constructor(private iconService: IconService) {
    this.iconService.load();
  }
}
