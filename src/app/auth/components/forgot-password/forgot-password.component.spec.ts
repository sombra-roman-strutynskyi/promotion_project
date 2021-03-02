import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getWrapperFormFields, getEmailField } from '@shared';
import { TestingModule, AuthFacadeMock, createComponent } from '@testing';
import { AuthFacade, AuthFormService } from '../../services';

import { ForgotPasswordComponent } from './forgot-password.component';

const imports = [TestingModule];
const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: AuthFormService,
    useValue: {
      getForgotPasswordFormFields: jest.fn(() => {
        return getWrapperFormFields([getEmailField()]);
      }),
    },
  },
];
describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authFacade: AuthFacade;
  beforeEach(() => {
    fixture = createComponent<ForgotPasswordComponent>(
      ForgotPasswordComponent,
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
    const spy = jest.spyOn(authFacade, 'forgotPassword');
    const data = {
      email: 'test@email.com',
    };
    component.onSubmit(data);
    expect(spy).toHaveBeenCalledWith(data.email);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
