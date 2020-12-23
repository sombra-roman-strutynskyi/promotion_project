import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SHARED_PIPES} from './pipes';

export const SHARED_MODULES = [
  CommonModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [/*...SHARED_COMPONENTS,*/ ...SHARED_PIPES],
  imports: [...SHARED_MODULES],
  exports: [/*...SHARED_COMPONENTS,*/ ...SHARED_PIPES, ...SHARED_MODULES],
})
export class SharedModule {
}
