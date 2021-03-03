import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacade } from '@auth';
import { ProfileFormConfigService } from '@modules/profile';
import {
  getWrapperFormFields,
  getPasswordField,
  getConfirmPasswordField,
} from '@shared';
import {
  AuthFacadeMock,
  createComponent,
  MOCK_CHANGE_PASSWORD,
  TestingModule,
} from '@testing';

import { ChangePasswordComponent } from './change-password.component';

const imports = [TestingModule];
const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: ProfileFormConfigService,
    useValue: {
      getPasswordFormFields: jest.fn((form, subject$) => {
        return getWrapperFormFields([
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
        ]);
      }),
    },
  },
];
describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  const spyClearForm = jest.spyOn(
    ChangePasswordComponent.prototype as any,
    'clearForm'
  );
  beforeEach(() => {
    fixture = createComponent<ChangePasswordComponent>(
      ChangePasswordComponent,
      providers,
      imports
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change password', () => {
    const spySubmitted = jest.spyOn(component.submitted, 'emit');

    component.changePassword(MOCK_CHANGE_PASSWORD);
    expect(spySubmitted).toHaveBeenCalledWith(MOCK_CHANGE_PASSWORD);
    expect(spyClearForm).toHaveBeenCalled();
  });
  it('should cancel', () => {
    component.onCancel();
    expect(spyClearForm).toHaveBeenCalled();
  });
  it('should enable form', () => {
    const spy = jest.spyOn(
      ChangePasswordComponent.prototype as any,
      'toggleFormStateDisabled'
    );
    component.enableForm();
    expect(spy).toHaveBeenCalledWith(false);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
