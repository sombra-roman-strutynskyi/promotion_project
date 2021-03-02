import { Injectable } from '@angular/core';
import { UiFormlyService } from '@shared';

@Injectable()
export class FormlyServiceMock implements Partial<UiFormlyService> {
  bindFieldsToFormState = jest.fn();
  setExpressionDisabled = jest.fn();
  bindChildControlsToParentForm = jest.fn();
}
