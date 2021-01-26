import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton, isNullOrUndefined } from '@shared';
import { IUpdateUser, UpdateUser, IUser } from '../../models';
@Component({
  selector: 'user-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserComponent {
  @Input() set currentUser(user: IUser) {
    if (!isNullOrUndefined(user)) {
      this.model = new UpdateUser(user);
    }
  }
  @Output() submitted = new EventEmitter<IUpdateUser>();

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'firstName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'First Name',
            required: true,
          },
        },
        {
          className: 'col-4',
          key: 'lastName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Last Name',
            required: true,
          },
        },
        {
          className: 'col-4',
          key: 'age',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Age',
            min: 6,
            max: 120,
          },
        },
      ],
    },
  ];
  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: true,
    },
  };
  formButtons: UiFormButton[] = [
    {
      label: 'Update Profile',
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
      classWrapper: 'col-1',

      action: { type: 'cancel' },
      style: {
        color: 'primary',
      },
    },
  ];

  model = {} as IUpdateUser;

  updateProfile(user: IUpdateUser) {
    this.toggleFormStateDisabled(true);
    this.submitted.emit(user);
  }

  onCancel() {
    this.formOptions.resetModel();
    this.toggleFormStateDisabled(true);
  }

  toggleFormStateDisabled(disabled: boolean) {
    this.formOptions.formState.disabled = disabled;
  }
}
