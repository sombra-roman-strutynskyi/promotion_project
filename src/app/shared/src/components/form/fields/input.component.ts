import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getDefaultValidationMessage } from '../../../constants';
import { IFormField } from '../../../models/forms';

@Component({
  selector: 'field-input',
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
      <mat-error *ngIf="control.touched && control.invalid && errors">
        <ng-container *ngFor="let error of errors">
          <span *ngIf="control.errors[error.type]">{{ error.message }}</span>
        </ng-container>
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

  get errors() {
    const {
      syncValidator = {},
      label = '',
      validationMessages = {},
    } = this.config;
    return Object.entries(syncValidator).reduce((errors, [type, val]) => {
      if (!!val) {
        const err = {
          type: type.toLowerCase(),
          message:
            validationMessages[type] ||
            getDefaultValidationMessage(type, label, val),
        };
        errors.push(err);
      }
      return errors;
    }, []);
  }

  onShowPassword() {
    this.hidePassword = !this.hidePassword;
  }
}
