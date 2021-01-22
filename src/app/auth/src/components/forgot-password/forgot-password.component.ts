import { Component } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton } from '@shared';
import { AuthFacade } from '../../services';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email',
            required: true,
          },
          validators: {
            validation: ['email'],
          },
        },
      ],
    },
  ];
  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: false,
    },
  };
  formButtons: UiFormButton[] = [
    {
      label: 'Send Email',
      type: 'submit',
      classNames: 'col-12',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
      },
    },
  ];
  model = { email: '' };

  constructor(private authFacade: AuthFacade) {}

  onSubmit({ email }) {
    this.authFacade.forgotPassword(email);
  }
}
