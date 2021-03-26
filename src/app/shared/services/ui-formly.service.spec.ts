import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getFirstNameField, getWrapperFormFields } from '../models';
import { UiFormlyService } from './ui-formly.service';

const field: FormlyFieldConfig = {
  className: 'col-12',
  key: 'firstName',
  type: 'input',
  templateOptions: {
    type: 'text',
    label: 'First Name',
    required: true,
  },
};
const expressions = {
  disabled: 'formState.disabled',
  validationShow: 'formState.showErrorState',
  disabledClassName: 'className',
};

describe('UiFormlyService', () => {
  let service: UiFormlyService;
  const spySetExpressionDisabled = jest.spyOn(
    UiFormlyService.prototype as any,
    'setExpressionDisabled'
  );
  const spySetExpressionValidationShow = jest.spyOn(
    UiFormlyService.prototype as any,
    'setExpressionValidationShow'
  );
  let spyBindFieldsToFormState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiFormlyService],
    });
    service = TestBed.inject(UiFormlyService);
    spyBindFieldsToFormState = jest.spyOn(service, 'bindFieldsToFormState');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should do nothing when call `bindFieldsToFormState`', () => {
    const fields: FormlyFieldConfig[] = [{ template: '<p>test<p>' }];

    expect(spyBindFieldsToFormState).toHaveBeenCalledTimes(0);

    service.bindFieldsToFormState(fields, expressions);

    expect(spyBindFieldsToFormState).toHaveBeenCalledTimes(1);
    expect(spySetExpressionDisabled).toHaveBeenCalledTimes(0);
    expect(spySetExpressionValidationShow).toHaveBeenCalledTimes(0);
  });

  it('should call `setExpressionDisabled and setExpressionValidationShow`', () => {
    service.bindFieldsToFormState([field], expressions);
    expect(spySetExpressionDisabled).toHaveBeenCalledWith(
      field,
      expressions.disabled,
      expressions.disabledClassName
    );
    expect(spySetExpressionValidationShow).toHaveBeenCalledWith(
      field,
      expressions.validationShow
    );
  });
  it('should recursive call `bindFieldsToFormState`', () => {
    const fields: FormlyFieldConfig[] = [...getWrapperFormFields([field])];

    service.bindFieldsToFormState(fields, expressions);
    expect(spyBindFieldsToFormState).toHaveBeenCalledWith(
      fields[0].fieldGroup,
      expressions
    );
    expect(spySetExpressionDisabled).toHaveBeenCalledWith(
      field,
      expressions.disabled,
      expressions.disabledClassName
    );
    expect(spySetExpressionValidationShow).toHaveBeenCalledWith(
      field,
      expressions.validationShow
    );
  });
  it('should call `bindChildControlsToParentForm`', () => {
    const childForm = new FormGroup({ childControl: new FormControl() });
    const parentForm = new FormGroup({});
    service.bindChildControlsToParentForm(childForm, parentForm);

    expect(Object.keys(childForm.parent.controls)[0]).toEqual('childControl');
    expect(Object.keys(parentForm.controls)[0]).toEqual('childControl');
  });
});
