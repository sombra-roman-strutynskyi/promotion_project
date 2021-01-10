import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFormFieldSyncValidation } from '../models';

@Injectable()
export class FormService {
  constructor() {}

  generateFormGroup(fields) {
    return fields.map((field) => {
      const initValue = null;
      const validationRules = this.getSyncValidators(field.syncValidator);
      const control = new FormControl(initValue, {
        validators: validationRules,
      });

      return [field.key, control];
    });
  }
  getSyncValidators(validationRules: IFormFieldSyncValidation = {}) {
    return Object.entries(validationRules).reduce((rules, [key, val]) => {
      switch (key) {
        case 'required':
          if (val as boolean) {
            rules.push(Validators.required);
          }
          break;
        case 'pattern':
          rules.push(Validators.pattern(val as RegExp));
          break;
        default:
          break;
      }
      return rules;
    }, []);
  }
}
