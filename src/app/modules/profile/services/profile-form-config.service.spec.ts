import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import {
  getAgeField,
  getConfirmPasswordField,
  getFirstNameField,
  getLastNameField,
  getPasswordField,
  getWrapperFormFields,
} from '@shared';
import { BehaviorSubject, Subject } from 'rxjs';

import { ProfileFormConfigService } from './profile-form-config.service';

describe('ProfileFormConfigService', () => {
  let service: ProfileFormConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileFormConfigService],
    });
    service = TestBed.inject(ProfileFormConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return fields for profile form', () => {
    expect(service.getProfileFormFields()).toEqual(
      getWrapperFormFields([
        getFirstNameField({
          className: 'col-md-4 col-sm-6 col-12',
        }),
        getLastNameField({
          className: 'col-md-4 col-sm-6 col-12',
        }),
        getAgeField({
          className: 'col-md-4 col-sm-6 col-12',
        }),
        {
          className: 'col-12',
          key: 'photo',
          type: 'file',
          templateOptions: {
            label: 'User Avatar',
            required: false,
            imageUrl$: new BehaviorSubject(
              './assets/images/user.svg'
            ).asObservable(),
          },
        },
      ])
    );
  });
  it('should return fields for password form', () => {
    const form = new FormGroup({});
    const subject$ = new Subject();
    expect(
      JSON.stringify(service.getPasswordFormFields(form, subject$))
    ).toEqual(
      JSON.stringify(
        getWrapperFormFields([
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
        ])
      )
    );
  });
  it('should update photo url', () => {
    const spy = jest.spyOn(
      ProfileFormConfigService.prototype as any,
      'nextPhotoURL'
    );
    const photoURL = 'photoURL';
    service.updatePhotoURL(photoURL);
    expect(spy).toHaveBeenCalledWith(photoURL);
  });
});
