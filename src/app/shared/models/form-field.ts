import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export interface IFieldOptions {
  className?: string;
  key?: string;
  label?: string;
}

export const getWrapperFormFields = (
  fields: FormlyFieldConfig[]
): FormlyFieldConfig[] => [
  {
    fieldGroupClassName: 'row',
    fieldGroup: fields,
  },
];

export const getEmailField = (): FormlyFieldConfig => ({
  className: 'col-12',
  key: 'email',
  type: 'input',
  templateOptions: {
    type: 'email',
    label: 'Email',
    required: true,
  },
  validators: {
    validation: ['email'],
  },
});

export const getPasswordField = (
  options = {} as IFieldOptions
): FormlyFieldConfig => ({
  className: options?.className || 'col-12',
  key: options?.key || 'password',
  type: 'input',
  templateOptions: {
    type: 'password',
    label: options?.label || 'Password',
    required: true,
    minLength: 6,
  },
});

export const getConfirmPasswordField = (
  options: IFieldOptions,
  form: FormGroup,
  subject$: Subject<any>,
  passwordKey: string
): FormlyFieldConfig => ({
  ...getPasswordField(options),
  validators: {
    fieldMatch: {
      expression: (control) => control.value === form.get(passwordKey).value,
      message: 'Password Not Matching',
    },
  },
  expressionProperties: {
    'templateOptions.disabled': () => !form.get(passwordKey).valid,
  },
  hooks: {
    onInit: (field) => {
      field.form
        .get(passwordKey)
        .valueChanges.pipe(
          takeUntil(subject$),
          tap(() => {
            field.formControl.updateValueAndValidity();
          })
        )
        .subscribe();
    },
  },
});

export const getFirstNameField = (
  options = {} as IFieldOptions
): FormlyFieldConfig => ({
  className: options?.className || 'col-12',
  key: 'firstName',
  type: 'input',
  templateOptions: {
    type: 'text',
    label: 'First Name',
    required: true,
  },
});

export const getLastNameField = (
  options = {} as IFieldOptions
): FormlyFieldConfig => ({
  className: options?.className || 'col-12',
  key: 'lastName',
  type: 'input',
  templateOptions: {
    type: 'text',
    label: 'Last Name',
    required: true,
  },
});

export const getAgeField = (
  options = {} as IFieldOptions
): FormlyFieldConfig => ({
  className: options?.className || 'col-12',
  key: 'age',
  type: 'input',
  templateOptions: {
    type: 'number',
    label: 'Age',
    min: 6,
    max: 120,
  },
});
