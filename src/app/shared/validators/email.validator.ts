/* tslint:disable */
import {
  AbstractControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { isObject } from '../helpers';
import { REGEXPS } from '../constants';

export function email(control: AbstractControl): ValidationErrors {
  if (isObject(Validators.required(control))) return null;

  const v: string = control.value;
  return REGEXPS.email.test(v) ? null : { email: true };
}
