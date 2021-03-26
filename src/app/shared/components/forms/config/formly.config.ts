import { ConfigOption, FormlyFieldConfig } from '@ngx-formly/core';
import { CustomValidators } from '../../../validators/index';
import { FormlyFieldFileComponent } from '../types';
import { FormlyWrapperImageUploaderComponent } from '../wrappers';

export const FORMLY_CONFIG: ConfigOption = {
  validationMessages: [
    { name: 'required', message: requiredValidationMessage },
    { name: 'pattern', message: patternValidationMessage },
    { name: 'email', message: 'This is not a valid email address' },
    { name: 'min', message: minValueValidationMessage },
    { name: 'minlength', message: minLengthValidationMessage },
    { name: 'max', message: maxValueValidationMessage },
    { name: 'maxlength', message: 'The text is too long' },
    { name: 'equalFields', message: `Fields don't match` },
    { name: 'equalPass', message: `Passwords doesn't match` },
  ],
  validators: [{ name: 'email', validation: CustomValidators.email }],
  types: [
    {
      name: 'file',
      component: FormlyFieldFileComponent,
      wrappers: ['image-uploader'],
    },
  ],
  wrappers: [
    { name: 'image-uploader', component: FormlyWrapperImageUploaderComponent },
  ],
  extras: {
    showError,
  },
};

export function showError(field: FormlyFieldConfig): boolean {
  return !!(field?.formControl?.invalid && field?.formControl?.touched);
}

export function requiredValidationMessage(_, field: FormlyFieldConfig): string {
  return `Please enter ${field.templateOptions.label}`;
}

export function patternValidationMessage(_, field: FormlyFieldConfig): string {
  return `Please enter a valid ${field.templateOptions.label}`;
}

export function minLengthValidationMessage(
  _,
  field: FormlyFieldConfig
): string {
  return `Should have ${field.templateOptions.minLength} characters`;
}

export function minValueValidationMessage(_, field: FormlyFieldConfig): string {
  return `Should be more then ${field.templateOptions.min}`;
}

export function maxValueValidationMessage(_, field: FormlyFieldConfig): string {
  return `Should be less then ${field.templateOptions.max}`;
}
