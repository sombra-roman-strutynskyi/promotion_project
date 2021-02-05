import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IUser } from '@auth';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { isEmptyObject, isNullOrUndefined, UiFormButton } from '@shared';
import { UpdateProfile, IUpdateProfile } from '../../models';
import { ProfileFormConfigService } from '../../services';

@Component({
  selector: 'profile-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() set currentUser(user: IUser) {
    if (!isNullOrUndefined(user) && !isEmptyObject(user)) {
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

  constructor(private formService: ProfileFormConfigService) {}

  ngOnInit() {
    this.fields = this.formService.getProfileFormFields();
  }

  updateProfile(profile: IUpdateProfile) {
    this.formService.updatePhotoURL(profile.photoURL);
    this.toggleFormStateDisabled(true);
    this.submitted.emit(profile);
  }

  onCancel() {
    this.formOptions.resetModel();
    this.toggleFormStateDisabled(true);
  }

  toggleFormStateDisabled(disabled: boolean) {
    this.formOptions.formState.disabled = disabled;
  }
}
