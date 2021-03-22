import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import {
  getAgeField,
  getConfirmPasswordField,
  getEmailField,
  getFirstNameField,
  getLastNameField,
  getPasswordField,
  getWrapperFormFields,
} from '@shared';
import { Subject } from 'rxjs';
import { AuthFormService } from './auth-form.service';

describe('Service: AuthForm', () => {
  let service: AuthFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFormService],
    });
    service = TestBed.inject(AuthFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return fields for login form', () => {
    expect(service.getLoginFormFields()).toEqual(
      getWrapperFormFields([
        getEmailField(),
        getPasswordField(),
        {
          className: 'col-12',
          key: 'remember',
          type: 'checkbox',
          templateOptions: {
            label: 'Remember Me',
          },
        },
      ])
    );
  });
  it('should return fields for register form', () => {
    expect(service.getRegisterFormFields()).toEqual(
      getWrapperFormFields([
        getFirstNameField(),
        getLastNameField(),
        getAgeField(),
        getEmailField(),
        getPasswordField(),
      ])
    );
  });
  it('should return fields for forgot password form', () => {
    expect(service.getForgotPasswordFormFields()).toEqual(
      getWrapperFormFields([getEmailField()])
    );
  });
  it('should return fields for reset password form', () => {
    const form = new FormGroup({});
    const subject$ = new Subject();
    expect(
      JSON.stringify(service.getResetPasswordFormFields(form, subject$))
    ).toEqual(
      JSON.stringify(
        getWrapperFormFields([
          getPasswordField({
            key: 'newPassword',
            label: 'New Password',
          }),
          getConfirmPasswordField(
            {
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
});
