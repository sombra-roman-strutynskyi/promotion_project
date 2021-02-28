import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  getFirstNameField,
  getLastNameField,
  getAgeField,
  getConfirmPasswordField,
  getEmailField,
  getPasswordField,
  getWrapperFormFields,
} from '@shared';
import { Subject } from 'rxjs';

@Injectable()
export class AuthFormService {
  constructor() {}

  public getLoginFormFields(): FormlyFieldConfig[] {
    const fields = [
      getEmailField(),
      getPasswordField(),
      {
        className: 'col-12',
        key: 'remember',
        type: 'checkbox',
        templateOptions: {
          label: 'Remember Me',
        },
      },
    ];
    return getWrapperFormFields(fields);
  }

  public getRegisterFormFields(): FormlyFieldConfig[] {
    const fields = [
      getFirstNameField(),
      getLastNameField(),
      getAgeField(),
      getEmailField(),
      getPasswordField(),
    ];
    return getWrapperFormFields(fields);
  }

  public getForgotPasswordFormFields(): FormlyFieldConfig[] {
    const fields = [getEmailField()];
    return getWrapperFormFields(fields);
  }

  public getResetPasswordFormFields(
    form: FormGroup,
    subject$: Subject<any>
  ): FormlyFieldConfig[] {
    const fields = [
      getPasswordField({
        key: 'newPassword',
        label: 'New Password',
      }),
      getConfirmPasswordField(
        {
          key: 'confirmPassword',
          label: 'Confirm Password',
        },
        form,
        subject$,
        'newPassword'
      ),
    ];
    return getWrapperFormFields(fields);
  }
}
