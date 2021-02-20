import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton } from '@shared';
import { IChangePassword } from '../../models';
import { ProfileFormConfigService } from '../../services';

@Component({
  selector: 'profile-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  @Output() submitted = new EventEmitter<IChangePassword>();
  form = new FormGroup({});
  fields: FormlyFieldConfig[];
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
      classWrapper: 'col-1',
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

  constructor(private formService: ProfileFormConfigService) {}
  ngOnInit() {
    this.fields = this.formService.getPasswordFormFields(this.form, this.model);
  }
  changePassword(data: IChangePassword) {
    this.submitted.emit(data);
    this.clearForm();
  }

  onCancel() {
    this.clearForm();
  }

  toggleFormStateDisabled(disabled: boolean) {
    this.formOptions.formState.disabled = disabled;
  }
  private clearForm() {
    this.formOptions.resetModel();
    this.toggleFormStateDisabled(true);
  }
}
