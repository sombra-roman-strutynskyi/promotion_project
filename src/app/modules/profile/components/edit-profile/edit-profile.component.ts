import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IUser } from '@auth';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormButton } from '@shared';
import { isEmpty, isNil } from 'lodash';
import { UpdateProfile, IUpdateProfile } from '../../models';
import { ProfileFormConfigService } from '../../services';

@Component({
  selector: 'profile-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() set currentUser(user: IUser) {
    if (!isNil(user) && !isEmpty(user)) {
      this.model = new UpdateProfile(user);
      this.formService.updatePhotoURL(this.model.photoURL);
    }
  }
  @Output() submitted = new EventEmitter<IUpdateProfile>();

  model = {} as IUpdateProfile;
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: true,
    },
  };
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
      label: 'Update Profile',
      type: 'submit',
      classWrapper: 'col-auto',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
      },
    },
  ];

  constructor(private formService: ProfileFormConfigService) {}

  ngOnInit() {
    this.fields = this.formService.getProfileFormFields();
  }

  public updateProfile(profile: IUpdateProfile): void {
    this.formService.updatePhotoURL(profile.photoURL);
    this.toggleFormStateDisabled(true);
    this.submitted.emit(profile);
  }

  public onCancel(): void {
    this.formOptions.resetModel();
    this.toggleFormStateDisabled(true);
  }
  public enableForm(): void {
    this.toggleFormStateDisabled(false);
  }

  private toggleFormStateDisabled(disabled: boolean): void {
    this.formOptions.formState.disabled = disabled;
  }
}
