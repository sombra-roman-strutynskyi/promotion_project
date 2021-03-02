import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacade, AuthFormService } from '@auth';
import { getEmailField, getPasswordField, getWrapperFormFields } from '@shared';
import {
  TestingModule,
  AuthFacadeMock,
  createComponent,
  MOCK_CREDENTIALS,
} from '@testing';
import { LoginComponent } from './login.component';

const imports = [TestingModule];
const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: AuthFormService,
    useValue: {
      getLoginFormFields: jest.fn(() => {
        return getWrapperFormFields([
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
        ]);
      }),
    },
  },
];
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacade: AuthFacade;
  beforeEach(() => {
    fixture = createComponent<LoginComponent>(
      LoginComponent,
      providers,
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
    const spy = jest.spyOn(authFacade, 'loginWithCredentials');
    component.onSubmit(MOCK_CREDENTIALS);
    expect(spy).toHaveBeenCalledWith(MOCK_CREDENTIALS);
  });
  it('should login with Google', () => {
    const spy = jest.spyOn(authFacade, 'loginWithGoogle');
    component.onLoginWithGoogle();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should login with Facebook', () => {
    const spy = jest.spyOn(authFacade, 'loginWithFacebook');
    component.onLoginWithFacebook();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
