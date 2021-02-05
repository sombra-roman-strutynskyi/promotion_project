import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { IChangePassword } from '../models';

@Injectable()
export class ProfileFormConfigService {
  photoURL$ = new BehaviorSubject<string>('./assets/images/user.svg');

  constructor() {}
  getProfileFormFields(): FormlyFieldConfig[] {
    return [
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
        ],
      },
    ];
  }

  updatePhotoURL(url: string) {
    this.photoURL$.next(url);
  }
  getPasswordFormFields(
    form: FormGroup,
    model: IChangePassword
  ): FormlyFieldConfig[] {
    return [
      {
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
            validators: {
              fieldMatch: {
                expression: (control) => control.value === model.newPassword,
                message: 'Password Not Matching',
              },
            },
            expressionProperties: {
              'templateOptions.disabled': () => !form.get('newPassword').valid,
            },
          },
        ],
      },
    ];
  }
}
