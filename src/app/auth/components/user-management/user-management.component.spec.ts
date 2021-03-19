import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade, AuthFormService, AuthService } from '@auth';
import {
  getWrapperFormFields,
  getPasswordField,
  getConfirmPasswordField,
} from '@shared';
import {
  activateRouteMockFactory,
  AuthFacadeMock,
  AuthServiceMock,
  createComponent,
  MOCK_RESET_PASSWORD,
  TestingModule,
} from '@testing';

import { UserManagementMode } from '../../models';
import { UserManagementComponent } from './user-management.component';

const MOCK_EMAIL = 'test@email.com';
const MOCK_OOB_CODE = 'verify_code';
const imports = [TestingModule];
const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: AuthService,
    useClass: AuthServiceMock,
  },
  {
    provide: AuthFormService,
    useValue: {
      getResetPasswordFormFields: jest.fn((form, subject$) => {
        return getWrapperFormFields([
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
        ]);
      }),
    },
  },
];
describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let authFacade: AuthFacade;
  describe('Reset Password', () => {
    beforeEach(() => {
      fixture = createComponent<UserManagementComponent>(
        UserManagementComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              queryParams: {
                oobCode: MOCK_OOB_CODE,
                mode: UserManagementMode.RESET_PASSWORD,
              },
            }),
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      authFacade = TestBed.inject(AuthFacade);
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should submit', () => {
      const spy = jest.spyOn(authFacade, 'resetPassword');
      component.onSubmit(MOCK_RESET_PASSWORD);
      expect(spy).toHaveBeenCalledWith(
        MOCK_OOB_CODE,
        MOCK_RESET_PASSWORD.newPassword,
        MOCK_EMAIL
      );
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
  describe('Verify Email', () => {
    beforeEach(() => {
      fixture = createComponent<UserManagementComponent>(
        UserManagementComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              queryParams: {
                oobCode: MOCK_OOB_CODE,
                mode: UserManagementMode.VERIFY_EMAIL,
              },
            }),
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      authFacade = TestBed.inject(AuthFacade);
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
  describe('Without Query Params', () => {
    beforeEach(() => {
      fixture = createComponent<UserManagementComponent>(
        UserManagementComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              queryParams: {},
            }),
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      authFacade = TestBed.inject(AuthFacade);
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
  describe('With Invalid Mode', () => {
    beforeEach(() => {
      fixture = createComponent<UserManagementComponent>(
        UserManagementComponent,
        [
          ...providers,
          {
            provide: ActivatedRoute,
            useFactory: activateRouteMockFactory({
              queryParams: {
                oobCode: MOCK_OOB_CODE,
                mode: 'INVALID',
              },
            }),
          },
        ],
        imports
      );
      component = fixture.componentInstance;
      authFacade = TestBed.inject(AuthFacade);
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
