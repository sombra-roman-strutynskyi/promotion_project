import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CustomValidators, UiFormButton } from '@shared';
import { IChangePassword } from '../../models/user';

@Component({
  selector: 'user-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  @Output() submitted = new EventEmitter<IChangePassword>();

  fields: FormlyFieldConfig[] = [
    {
      validators: [
        CustomValidators.controlsEqual(
          'confirmPassword',
          'newPassword',
          'equalPass'
        ),
      ],
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'oldPassword',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Old Password',
            placeholder: '•'.repeat(8),
            required: true,
            minLength: 6,
          },
        },
        {
          className: 'col-4',
          key: 'newPassword',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'New Password',
            placeholder: '•'.repeat(8),
            required: true,
            minLength: 6,
          },
        },
        {
          className: 'col-4',
          key: 'confirmPassword',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: '•'.repeat(8),
            required: true,
            minLength: 6,
          },
        },
      ],
    },
  ];

  formButtons: UiFormButton[] = [
    {
      label: 'Change Password',
      type: 'submit',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
      },
    },
    {
      label: 'Cancel',
      type: 'button',
      classWrapper:'col-1',
      action: { type: 'cancel' },
      style: {
        color: 'primary',
      },
    },
  ];

  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: true,
    },
  };

  model = {} as IChangePassword;

  changePassword(data: IChangePassword) {
    this.toggleFormStateDisabled(true);
    this.submitted.emit(data);
  }

  onCancel() {
    this.formOptions.resetModel();
    this.toggleFormStateDisabled(true);
  }

  toggleFormStateDisabled(disabled: boolean) {
    this.formOptions.formState.disabled = disabled;
  }
}
