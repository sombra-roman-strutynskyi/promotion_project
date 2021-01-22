import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton, ROUTES_DATA } from '@shared';
import { ICredentials } from '../../models';
import { AuthFacade } from '../../services';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
        {
          className: 'col-12',
          key: 'remember',
          type: 'checkbox',
          templateOptions: {
            label: 'Remember Me',
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
      label: 'Sing In',
      type: 'submit',
      classNames: 'col-12',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
      },
    },
  ];
  model = { remember: false } as ICredentials;
  linkToResetPassword=[`../${ROUTES_DATA.AUTH.children.FORGOT_PASSWORD.path}`] 
  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {}
  onSubmit(credentials: ICredentials) {
    this.authFacade.loginWithCredentials(credentials);
  }
  onLoginWithGoogle() {
    this.authFacade.loginWithGoogle();
  }
  onLoginWithFacebook() {
    this.authFacade.loginWithFacebook();
  }
}
