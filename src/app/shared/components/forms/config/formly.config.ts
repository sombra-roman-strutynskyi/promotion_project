import { ConfigOption } from '@ngx-formly/core';
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

export function showError(field: any) {
  return (
    field.formControl && field.formControl.invalid && field.formControl.touched
  );
}

export function requiredValidationMessage(err, field) {
  return `Please enter ${field.templateOptions.label}`;
}
export function patternValidationMessage(err, field) {
  return `Please enter a valid ${field.templateOptions.label}`;
}

export function patternValidationTime(err, field) {
  return `${field.templateOptions.label} should have hh:mm format`;
}

export function minLengthValidationMessage(err, field) {
  return `Should have ${field.templateOptions.minLength} characters`;
}

export function minValueValidationMessage(err, field) {
  return `Should be more then ${field.templateOptions.min}`;
}

export function maxValueValidationMessage(err, field) {
  return `Should be less then ${field.templateOptions.max}`;
}
