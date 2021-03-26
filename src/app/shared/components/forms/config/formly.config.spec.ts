import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  maxValueValidationMessage,
  minLengthValidationMessage,
  minValueValidationMessage,
  patternValidationMessage,
  requiredValidationMessage,
  showError,
} from './formly.config';

describe('Test Validation Function', () => {
  const field: FormlyFieldConfig = {
    formControl: {
      invalid: true,
      touched: true,
    } as AbstractControl,
    templateOptions: {
      label: 'Label',
      minLength: 0,
      min: 1,
      max: 10,
    },
  };
  it('should return true when call `showError`', () => {
    expect(showError(field)).toEqual(true);
  });
  it('should return false when call `showError`', () => {
    expect(
      showError({
        formControl: { invalid: true, touched: false },
      } as FormlyFieldConfig)
    ).toEqual(false);

    expect(
      showError({
        formControl: { invalid: false, touched: true },
      } as FormlyFieldConfig)
    ).toEqual(false);

    expect(
      showError({
        formControl: { invalid: false, touched: false },
      } as FormlyFieldConfig)
    ).toEqual(false);

    expect(
      showError({ formControl: { touched: false } } as FormlyFieldConfig)
    ).toEqual(false);

    expect(
      showError({ formControl: { invalid: false } } as FormlyFieldConfig)
    ).toEqual(false);

    expect(showError({ formControl: {} } as FormlyFieldConfig)).toEqual(false);
    expect(showError({ formControl: null } as FormlyFieldConfig)).toEqual(
      false
    );
    expect(showError(null)).toEqual(false);
  });
  it('should return required validation message', () => {
    expect(requiredValidationMessage('', field)).toEqual('Please enter Label');
  });
  it('should return pattern validation message', () => {
    expect(patternValidationMessage('', field)).toEqual(
      'Please enter a valid Label'
    );
  });
  it('should return min length validation message', () => {
    expect(minLengthValidationMessage('', field)).toEqual(
      'Should have 0 characters'
    );
  });
  it('should return min value validation message', () => {
    expect(minValueValidationMessage('', field)).toEqual(
      'Should be more then 1'
    );
  });
  it('should return max value validation message', () => {
    expect(maxValueValidationMessage('', field)).toEqual(
      'Should be less then 10'
    );
  });
});
