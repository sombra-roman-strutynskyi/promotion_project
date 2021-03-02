import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton } from '@shared';
import { AuthFacade, AuthFormService } from '../../services';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  fields: FormlyFieldConfig[];
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

  constructor(
    private authFacade: AuthFacade,
    private formService: AuthFormService
  ) {}

  ngOnInit() {
    this.fields = this.formService.getForgotPasswordFormFields();
  }

  public onSubmit({ email }: { email: string }): void {
    this.authFacade.forgotPassword(email);
  }
}
