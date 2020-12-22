import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_PIPES } from './pipes';

export const SHARED_MODULES = [
  
  CommonModule,
];

@NgModule({
  declarations: [/*...SHARED_COMPONENTS,*/ ...SHARED_PIPES],
  imports: [
    ...SHARED_MODULES
  ],
  exports: [/*...SHARED_COMPONENTS,*/ ...SHARED_PIPES, ...SHARED_MODULES]
})
export class SharedModule { }
