import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFacade } from '@auth';
import {
  AuthFacadeMock,
  ComponentMock,
  createComponent,
  MOCK_UPDATED_PROFILE,
  ProfileFacadeMock,
  TestingModule,
} from '@testing';
import { ProfileFacade } from '../../services';
import { ProfileComponent } from './profile.component';
import { MOCK_PROFILE, MOCK_CHANGE_PASSWORD } from '@testing';
const imports = [TestingModule];
const providers = [
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: ProfileFacade,
    useClass: ProfileFacadeMock,
  },
];
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileFacade: ProfileFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        ComponentMock({
          selector: 'profile-edit-profile',
          inputs: ['currentUser'],
          outputs: ['submitted'],
        }),
        ComponentMock({
          selector: 'profile-change-password',
          outputs: ['submitted'],
        }),
      ],
      imports,
      providers,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileFacade = TestBed.inject(ProfileFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update profile', () => {
    const spy = jest.spyOn(profileFacade, 'updateProfile');
    component.updateUserProfile(MOCK_PROFILE);
    expect(spy).toHaveBeenCalledWith(MOCK_UPDATED_PROFILE);
  });
  it('should change password', () => {
    const spy = jest.spyOn(profileFacade, 'changePassword');
    component.updateUserPassword(MOCK_CHANGE_PASSWORD);
    expect(spy).toHaveBeenCalledWith(MOCK_CHANGE_PASSWORD);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
