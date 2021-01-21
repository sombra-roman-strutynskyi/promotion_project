// tslint:disable:only-arrow-functions
import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

export function equalTo(equalControl: AbstractControl): ValidatorFn {
  let subscribe = false;

  return function(control: AbstractControl): ValidationErrors {
    if (!subscribe) {
      subscribe = true;
      equalControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity({ emitEvent: false });
      });
    }

    const v: string = control.value;

    return equalControl.value === v ? null : { equalTo: true };
  };
}

export function controlsEqual(
  controlKey: string,
  equalToKey: string,
  errorKey: string = 'equalFields' // here you can customize validation error key
) {
  return function(form: FormGroup) {
    const control = form.get(controlKey);
    if (!control) {
      return null;
    }

    if (control.value !== form.get(equalToKey).value) {
      control.setErrors({ [errorKey]: true });
      return {
        [errorKey]: true,
      };
    } else {
      control.setErrors(null);
      return null;
    }
  };
}
