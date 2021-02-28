import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton } from '@shared';
import { IRegisterUser } from '../../models';
import { AuthFacade, AuthFormService } from '../../services';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fields: FormlyFieldConfig[];
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

  constructor(
    private authFacade: AuthFacade,
    private formService: AuthFormService
  ) {}

  ngOnInit() {
    this.fields = this.formService.getRegisterFormFields();
  }

  public onSubmit(user: IRegisterUser): void {
    this.authFacade.register(user);
  }
}
