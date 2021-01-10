import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFormField } from '../../../models/forms';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field class="field" appearance="standard">
      <mat-label>{{ config.label }} </mat-label>
      <input matInput [formControl]="control" [type]="type" />
      <button
        *ngIf="config.type === 'password'"
        mat-icon-button
        matSuffix
        (click)="onShowPassword()"
        [attr.aria-label]="'Hide password'"
        [attr.aria-pressed]="hidePassword"
      >
        <mat-icon>{{
          hidePassword ? 'visibility_off' : 'visibility'
        }}</mat-icon>
      </button>
      <mat-error *ngIf="control.touched && control.invalid">
        <span *ngIf="control.errors.required">dddd</span>
        <span *ngIf="control.errors.pattern">This field is invalid.</span>
      </mat-error>
    </mat-form-field>
  `,
  styles: [
    `
      .field {
        width: 100%;
      }
    `,
  ],
})
export class InputComponent {
  hidePassword = true;
  @Input() config: IFormField;
  @Input() control: AbstractControl;

  get type() {
    const { type } = this.config;
    if (!!type) {
      if (type === 'password' && !this.hidePassword) {
        return 'text';
      }
      return type;
    }
    return 'text';
  }

  onShowPassword() {
    this.hidePassword = !this.hidePassword;
  }
}
