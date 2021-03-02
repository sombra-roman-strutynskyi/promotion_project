import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacade, AuthFormService } from '@auth';
import {
  getAgeField,
  getEmailField,
  getFirstNameField,
  getLastNameField,
  getPasswordField,
  getWrapperFormFields,
} from '@shared';
import {
  TestingModule,
  AuthFacadeMock,
  MOCK_REGISTER_USER,
  createComponent,
} from '@testing';

import { RegisterComponent } from './register.component';
const imports = [TestingModule];

const providers = [
  {
    provide: AuthFormService,
    useValue: {
      getRegisterFormFields: jest.fn(() => {
        return getWrapperFormFields([
          getFirstNameField(),
          getLastNameField(),
          getAgeField(),
          getEmailField(),
          getPasswordField(),
        ]);
      }),
    },
  },

  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
];
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let authFacade: AuthFacade;
  beforeEach(() => {
    fixture = createComponent<RegisterComponent>(
      RegisterComponent,
      providers,
      imports
    );
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    const spy = jest.spyOn(authFacade, 'register');
    component.onSubmit(MOCK_REGISTER_USER);
    expect(spy).toHaveBeenCalledWith(MOCK_REGISTER_USER);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
