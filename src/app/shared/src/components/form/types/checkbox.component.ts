import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFormField } from '@shared';

@Component({
  selector: 'app-checkbox',
  template: `
    <!-- <mat-checkbox color="primary" [formControl]="control">{{
    config.label
  }}</mat-checkbox> -->
  `,
})
export class CheckboxComponent {
  @Input() config: IFormField;
  @Input() control: AbstractControl;
}
