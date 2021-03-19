import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  getAgeField,
  getConfirmPasswordField,
  getFirstNameField,
  getLastNameField,
  getPasswordField,
  getWrapperFormFields,
  IFieldOptions,
} from '@shared';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ProfileFormConfigService {
  private photoURL$ = new BehaviorSubject<string>('./assets/images/user.svg');

  constructor() {}
  public getProfileFormFields(): FormlyFieldConfig[] {
    const options: IFieldOptions = {
      className: 'col-md-4 col-sm-6 col-12',
    };
    const fields = [
      getFirstNameField(options),
      getLastNameField(options),
      getAgeField(options),
      {
        className: 'col-12',
        key: 'photo',
        type: 'file',
        templateOptions: {
          label: 'User Avatar',
          required: false,
          imageUrl$: this.photoURL$.asObservable(),
        },
      },
    ];
    return getWrapperFormFields(fields);
  }

  public updatePhotoURL(url: string) {
    this.nextPhotoURL(url);
  }

  private nextPhotoURL(url: string) {
    this.photoURL$.next(url);
  }

  public getPasswordFormFields(
    form: FormGroup,
    subject$: Subject<any>
  ): FormlyFieldConfig[] {
    const fields = [
      getPasswordField({
        className: 'col-md-4 col-sm-6 col-12',
        key: 'oldPassword',
        label: 'Old Password',
      }),
      getPasswordField({
        className: 'col-md-4 col-sm-6 col-12',
        key: 'newPassword',
        label: 'New Password',
      }),
      getConfirmPasswordField(
        {
          className: 'col-md-4 col-sm-6 col-12',
          key: 'confirmPassword',
          label: 'Confirm Password',
        },
        form,
        subject$,
        'newPassword'
      ),
    ];
    return getWrapperFormFields(fields);
  }
}
