import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SubscriptionDisposer, UiFormButton } from '@shared';
import { IChangePassword } from '../../models';
import { ProfileFormConfigService } from '../../services';

@Component({
  selector: 'profile-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent
  extends SubscriptionDisposer
  implements OnInit {
  @Output() submitted = new EventEmitter<IChangePassword>();
  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  formButtons: UiFormButton[] = [
    {
      label: 'Cancel',
      type: 'button',
      classWrapper: 'col row no-gutters justify-content-end ',
      action: { type: 'cancel' },
      style: {
        color: 'primary',
      },
    },
    {
      label: 'Change Password',
      classWrapper: 'col-auto',
      type: 'submit',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
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

  constructor(private formService: ProfileFormConfigService) {
    super();
  }

  ngOnInit() {
    this.fields = this.formService.getPasswordFormFields(
      this.form,
      this.ngSubject
    );
  }
  public changePassword(data: IChangePassword): void {
    this.submitted.emit(data);
    this.clearForm();
  }

  public onCancel(): void {
    this.clearForm();
  }

  public enableForm(): void {
    this.toggleFormStateDisabled(false);
  }

  private toggleFormStateDisabled(disabled: boolean): void {
    this.formOptions.formState.disabled = disabled;
  }

  private clearForm() {
    this.formOptions.resetModel();
    this.toggleFormStateDisabled(true);
  }
}
