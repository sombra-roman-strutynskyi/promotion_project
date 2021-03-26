import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class UiFormlyService {
  constructor() {}

  public bindFieldsToFormState(
    fields: FormlyFieldConfig[],
    expressions: {
      disabled: string;
      validationShow?: string;
      disabledClassName?: string;
    }
  ): void {
    fields?.forEach((field) => {
      if (field?.fieldGroup?.length) {
        this.bindFieldsToFormState(field.fieldGroup, expressions);
      } else if (!field['template']) {
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

  private setExpressionDisabled(
    field,
    expression = 'formState.disabled',
    disabledClassName?: string
  ): void {
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

  private setExpressionValidationShow(
    field,
    expression = 'formState.showErrorState'
  ): void {
    field.expressionProperties = field.expressionProperties || {};
    if (!(field['validation'] && field.validation['show'])) {
      field['validation'] = { show: undefined };
      field.expressionProperties['validation.show'] = expression;
    }
  }

  public bindChildControlsToParentForm(
    childForm: FormGroup,
    parentForm: FormGroup
  ): void {
    Object.entries(childForm.controls).forEach(([name]) => {
      parentForm.addControl(name, childForm);
    });
    childForm.setParent(parentForm);
  }
}
