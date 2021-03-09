import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacade } from '@auth';
import { ProfileFormConfigService } from '@modules/profile';
import {
  getWrapperFormFields,
  getFirstNameField,
  getLastNameField,
  getAgeField,
} from '@shared';
import {
  TestingModule,
  AuthFacadeMock,
  createComponent,
  MOCK_USER,
  MOCK_PROFILE,
} from '@testing';

import { of } from 'rxjs';
import { EditProfileComponent } from './edit-profile.component';
const imports = [TestingModule];
const providers = [
  {
    provide: ProfileFormConfigService,
    useValue: {
      getProfileFormFields: jest.fn(() => {
        return getWrapperFormFields([
          getFirstNameField(),
          getLastNameField(),
          getAgeField(),
          {
            className: 'col-12',
            key: 'photo',
            type: 'file',
            templateOptions: {
              label: 'User Avatar',
              required: false,
              imageUrl$: of('test'),
            },
          },
        ]);
      }),
      updatePhotoURL: jest.fn(),
    },
  },
];
describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let formService: ProfileFormConfigService;
  const spyToggleFormState = jest.spyOn(
    EditProfileComponent.prototype as any,
    'toggleFormStateDisabled'
  );

  beforeEach(() => {
    fixture = createComponent<EditProfileComponent>(
      EditProfileComponent,
      providers,
      imports
    );
    component = fixture.componentInstance;
    formService = TestBed.inject(ProfileFormConfigService);
    fixture.detectChanges();
  });

  it('should create with user', () => {
    component.currentUser = MOCK_USER;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
  it('should create without user', () => {
    component.currentUser = null;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should update profile', () => {
    const spyUpdatePhotoUrl = jest.spyOn(formService, 'updatePhotoURL');
    const spySubmitted = jest.spyOn(component.submitted, 'emit');

    component.updateProfile(MOCK_PROFILE);
    expect(spyUpdatePhotoUrl).toHaveBeenCalledWith(MOCK_PROFILE.photoURL);
    expect(spySubmitted).toHaveBeenCalledWith(MOCK_PROFILE);
    expect(spyToggleFormState).toHaveBeenCalledWith(true);
  });
  it('should cancel form', () => {
    const spyResetModel = jest.spyOn(component.formOptions, 'resetModel');

    component.onCancel();
    expect(spyResetModel).toHaveBeenCalled();
    expect(spyToggleFormState).toHaveBeenCalledWith(true);
  });
  it('should enable form', () => {
    component.enableForm();
    expect(spyToggleFormState).toHaveBeenCalledWith(false);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
