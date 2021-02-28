import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton, ROUTES_DATA } from '@shared';
import { ICredentials } from '../../models';
import { AuthFacade, AuthFormService } from '../../services';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fields: FormlyFieldConfig[];
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
  linkToResetPassword = [
    `../${ROUTES_DATA.AUTH.children.FORGOT_PASSWORD.path}`,
  ];
  constructor(
    private authFacade: AuthFacade,
    private formService: AuthFormService
  ) {}
  ngOnInit() {
    this.fields = this.formService.getLoginFormFields();
  }
  public onSubmit(credentials: ICredentials): void {
    this.authFacade.loginWithCredentials(credentials);
  }
  public onLoginWithGoogle(): void {
    this.authFacade.loginWithGoogle();
  }
  public onLoginWithFacebook(): void {
    this.authFacade.loginWithFacebook();
  }
}
