// tslint:disable:only-arrow-functions
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class UiFormlyService {
  constructor() {}

  /** apply expressionProperty recurceivelly for disabled based on formState to all fields recursievly */
  bindFieldsToFormState(
    fields: FormlyFieldConfig[],
    expressions: {
      disabled: string | any;
      validationShow?: string;
      disabledClassName?: string;
    }
  ) {
    fields.forEach(field => {
      if (field['fieldGroup'] && field?.fieldGroup?.length) {
        this.bindFieldsToFormState(field.fieldGroup, expressions);
      } else if (!field['template'] && field.type !== 'button') {
        this.setExpressionDisabled(
          field,
          expressions.disabled,
          expressions.disabledClassName
        );
        if (expressions.validationShow) {
          this.setExpressionValidationShow(field, expressions.validationShow);
        }
      }
    });
  }

  setExpressionDisabled(
    field,
    expression = 'formState.disabled',
    disabledClassName?: string
  ) {
    field.expressionProperties = field.expressionProperties || {};
    if (!field?.templateOptions?.disabled) {
      field.expressionProperties['templateOptions.disabled'] =
        field.expressionProperties['templateOptions.disabled'] || expression;
    }
    if (disabledClassName) {
      const classes = field.className || '';
      field.expressionProperties['className'] =
        field.expressionProperties['className'] ||
        `formState.disabled ? "input-view-mode ${classes}" : "${classes}"`;
    }
  }

  setExpressionValidationShow(field, expression = 'formState.showErrorState') {
    field.expressionProperties = field.expressionProperties || {};
    if (!(field['validation'] && field.validation['show'])) {
      field['validation'] = { show: undefined };
      field.expressionProperties['validation.show'] = expression;
    }
  }

  bindChildControlsToParentForm(childForm: FormGroup, parentForm: FormGroup) {
    Object.entries(childForm.controls).forEach(([name, control]) => {
      parentForm.addControl(name, childForm);
    });
    childForm.setParent(parentForm);
  }
}

