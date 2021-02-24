import { Component } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton } from '@shared';
import { IRegisterUser } from '../../models';
import { AuthFacade } from '../../services';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'firstName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'First Name',
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'lastName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Last Name',
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'age',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Age',
            min: 6,
            max: 120,
          },
        },
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
        {
          className: 'col-12',
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            required: true,
            minLength: 6,
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
      label: 'Sign Up',
      type: 'submit',
      classNames: 'col-12',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
      },
    },
  ];
  model = {} as IRegisterUser;

  constructor(private authFacade: AuthFacade) {}

  onSubmit(user: IRegisterUser) {
    this.authFacade.register(user);
  }
}
