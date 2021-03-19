import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
export { cold, hot } from 'jasmine-marbles';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@auth';
import { SnackbarService } from '@shared';
import {
  AuthFacadeMock,
  MockStoreModule,
  MOCK_FIREBASE_ERROR,
  MOCK_UPDATED_PROFILE,
  ProfileFacadeMock,
  RouterMock,
} from '@testing';
import { cold, hot } from 'jasmine-marbles';
import { ProfileDbService, ProfileFacade } from '../services';
import { initialState, PROFILE_FEATURE_KEY } from '../state/profile.reducer';
import * as ProfileActions from './profile.actions';
import { ProfileEffects } from './profile.effects';

describe('ProfileEffects', () => {
  let store: Store<any>;
  let effects: ProfileEffects;
  let authFacade: AuthFacade;
  let profileDbService: ProfileDbService;
  let actions$: Observable<any>;
  let routerService: Partial<Router>;
  let dialog: MatDialog;
  let snackBar: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockStoreModule.forRoot(PROFILE_FEATURE_KEY, { initialState })],
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        { provide: AuthFacade, useClass: AuthFacadeMock },
        { provide: ProfileFacade, useClass: ProfileFacadeMock },
        {
          provide: ProfileDbService,
          useValue: {},
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: SnackbarService,
          useValue: { open: jest.fn() },
        },
        {
          provide: MatDialog,
          useValue: { open: jest.fn() },
        },
      ],
    });

    store = TestBed.inject(Store);
    effects = TestBed.inject(ProfileEffects);
    authFacade = TestBed.inject(AuthFacade);
    actions$ = TestBed.inject(Actions);
    routerService = TestBed.inject(Router);
    profileDbService = TestBed.inject(ProfileDbService);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(SnackbarService);
  });

  describe('changePassword$', () => {
    beforeEach(() => {
      const action = ProfileActions.changePassword({
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
      });

      actions$ = hot('-a', { a: action });
    });
    it('should return an ProfileActions.changePasswordSuccess action, when profileDb succeeds', () => {
      const completion = ProfileActions.changePasswordSuccess();

      const response = cold('-a|', {
        a: {
          data: {},
        },
      });
      const expected = cold('--c', { c: completion });

      profileDbService.changePassword = jest.fn(() => response);
      expect(effects.changePassword$).toBeObservable(expected);
    });

    it('should return a new  ProfileActions.changePasswordFailure if the profileDb service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = ProfileActions.changePasswordFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      profileDbService.changePassword = jest.fn(() => response);
      expect(effects.changePassword$).toBeObservable(expected);
    });
  });

  describe('updateUserProfile$', () => {
    beforeEach(() => {
      const action = ProfileActions.updateUserProfile({
        profile: MOCK_UPDATED_PROFILE,
      });

      actions$ = hot('-a', { a: action });
    });
    it('should return an ProfileActions.updateUserProfileSuccess action, when profileDb succeeds', () => {
      const spy = jest.spyOn(authFacade, 'loadProfile');
      const completion = ProfileActions.updateUserProfileSuccess();

      const response = cold('-a|', {
        a: {
          data: {},
        },
      });
      const expected = cold('--c', { c: completion });

      profileDbService.updateProfile = jest.fn(() => response);
      expect(effects.updateUserProfile$).toBeObservable(expected);

      expect(spy).toHaveBeenCalled();
    });

    it('should return a new  ProfileActions.updateUserProfileFailure if the profileDb service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = ProfileActions.updateUserProfileFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      profileDbService.updateProfile = jest.fn(() => response);
      expect(effects.updateUserProfile$).toBeObservable(expected);
    });
  });
  describe('changePasswordSuccess$', () => {
    it('should call DialogOpen action when ProfileActions.changePasswordSuccess is dispatched', (done) => {
      const dialogOpen = jest.spyOn(dialog, 'open');
      const action = ProfileActions.changePasswordSuccess();
      actions$ = of(action);

      effects.changePasswordSuccess$.subscribe(() => {
        expect(dialogOpen).toHaveBeenCalled();

        done();
      });
    });
  });

  describe('handleError$', () => {
    it(`should call SnackbarOpen when is dispatched action from list:
        ProfileActions.updateUserProfileFailure,
        ProfileActions.changePasswordFailure.
      `, (done: any) => {
      const snackbarOpen = jest.spyOn(snackBar, 'open');

      const error = MOCK_FIREBASE_ERROR;
      actions$ = of(
        ProfileActions.updateUserProfileFailure({ error }),
        ProfileActions.changePasswordFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledWith(MOCK_FIREBASE_ERROR.message);
        done();
      });
    });
    it(`should not call SnackbarOpen when is dispatched action without message from list:
        ProfileActions.updateUserProfileFailure,
        ProfileActions.changePasswordFailure.
      `, (done: any) => {
      const snackbarOpen = jest.spyOn(snackBar, 'open');

      const error = { ...MOCK_FIREBASE_ERROR, message: null };
      actions$ = of(
        ProfileActions.updateUserProfileFailure({ error }),
        ProfileActions.changePasswordFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
