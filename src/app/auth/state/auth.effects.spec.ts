import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
export { cold, hot } from 'jasmine-marbles';
import { MatDialog } from '@angular/material/dialog';
import { ROUTES_DATA, SnackbarService, UserCredential } from '@shared';
import {
  AuthFacadeMock,
  AuthServiceMock,
  MockStoreModule,
  MOCK_CREDENTIALS,
  MOCK_FIREBASE_ERROR,
  RouterMock,
  MOCK_REGISTER_USER,
  MOCK_FIREBASE_USER_CREDENTIALS,
  MOCK_USER,
} from '@testing';
import { cold, hot } from 'jasmine-marbles';
import { AuthFacade, AuthService } from '../services';
import { AUTH_FEATURE_KEY, initialState } from '../state/auth.reducer';
import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let store: Store<any>;
  let effects: AuthEffects;
  let authService: AuthService;
  let actions$: Observable<any>;
  let routerService: Partial<Router>;
  let router;
  let dialog: MatDialog;
  let snackBar: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockStoreModule.forRoot(AUTH_FEATURE_KEY, { initialState })],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: Router,
          useClass: RouterMock,
        },

        { provide: AuthFacade, useClass: AuthFacadeMock },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
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
    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
    actions$ = TestBed.inject(Actions);
    routerService = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(SnackbarService);

    router = jest.spyOn(routerService, 'navigateByUrl');
  });

  describe('loginWithCredentials$', () => {
    beforeEach(() => {
      const action = AuthActions.loginWithCredentials({
        credentials: MOCK_CREDENTIALS,
      });

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.loginWithCredentialsSuccess action, when login succeeds', () => {
      const completion = AuthActions.loginWithCredentialsSuccess();

      const response = cold('-a|', {
        a: {
          data: {},
        },
      });
      const expected = cold('--c', { c: completion });

      authService.loginWithCredentials = jest.fn(() => response);
      expect(effects.loginWithCredentials$).toBeObservable(expected);
    });

    it('should return a new AuthActions.loginWithCredentialsFailure if the auth service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = AuthActions.loginWithCredentialsFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.loginWithCredentials = jest.fn(() => response);
      expect(effects.loginWithCredentials$).toBeObservable(expected);
    });
  });

  describe('googleLogin$', () => {
    beforeEach(() => {
      const action = AuthActions.loginWithGoogle();

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.loginWithGoogleSuccess action, when login succeeds', () => {
      const completion = AuthActions.loginWithGoogleSuccess();

      const response = cold('-a|', {
        a: {
          data: {},
        },
      });
      const expected = cold('--c', { c: completion });

      authService.googleLogin = jest.fn(() => response);
      expect(effects.googleLogin$).toBeObservable(expected);
    });

    it('should return a new AuthActions.loginWithGoogleFailure if the auth service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = AuthActions.loginWithGoogleFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.googleLogin = jest.fn(() => response);
      expect(effects.googleLogin$).toBeObservable(expected);
    });
    it('should return a new AuthActions.loginWithGoogleSuccess if the auth service throws error with code for merge accounts', () => {
      const error = {
        ...MOCK_FIREBASE_ERROR,
        code: 'auth/account-exists-with-different-credential',
      };
      const completion = AuthActions.loginWithGoogleSuccess();

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.googleLogin = jest.fn(() => response);
      authService.mergeAccounts = jest.fn(() =>
        of(MOCK_FIREBASE_USER_CREDENTIALS as UserCredential)
      );
      expect(effects.googleLogin$).toBeObservable(expected);
    });
    it('should return a new AuthActions.loginWithGoogleFailure if the auth service throws error with code for merge accounts ', () => {
      const error = {
        ...MOCK_FIREBASE_ERROR,
        code: 'auth/account-exists-with-different-credential',
      };
      const completion = AuthActions.loginWithGoogleFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.googleLogin = jest.fn(() => response);
      authService.mergeAccounts = jest.fn(() => of(null));
      expect(effects.googleLogin$).toBeObservable(expected);
    });
  });

  describe('facebookLogin$', () => {
    beforeEach(() => {
      const action = AuthActions.loginWithFacebook();

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.loginWithFacebookSuccess action when login succeeds', () => {
      const completion = AuthActions.loginWithFacebookSuccess();

      const response = cold('-a|', {
        a: {
          data: {},
        },
      });
      const expected = cold('--c', { c: completion });

      authService.facebookLogin = jest.fn(() => response);
      expect(effects.facebookLogin$).toBeObservable(expected);
    });

    it('should return a new AuthActions.loginWithFacebookFailure if the auth service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = AuthActions.loginWithFacebookFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.facebookLogin = jest.fn(() => response);
      expect(effects.facebookLogin$).toBeObservable(expected);
    });
    it('should return a new AuthActions.loginWithFacebookSuccess if the auth service throws error with code for merge accounts', () => {
      const error = {
        ...MOCK_FIREBASE_ERROR,
        code: 'auth/account-exists-with-different-credential',
      };
      const completion = AuthActions.loginWithFacebookSuccess();

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.facebookLogin = jest.fn(() => response);
      authService.mergeAccounts = jest.fn(() =>
        of(MOCK_FIREBASE_USER_CREDENTIALS as UserCredential)
      );
      expect(effects.facebookLogin$).toBeObservable(expected);
    });
    it('should return a new AuthActions.loginWithFacebookFailure if the auth service throws error with code for merge accounts ', () => {
      const error = {
        ...MOCK_FIREBASE_ERROR,
        code: 'auth/account-exists-with-different-credential',
      };
      const completion = AuthActions.loginWithFacebookFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.facebookLogin = jest.fn(() => response);
      authService.mergeAccounts = jest.fn(() => of(null));
      expect(effects.facebookLogin$).toBeObservable(expected);
    });
  });

  describe('register$', () => {
    beforeEach(() => {
      const action = AuthActions.register({ user: MOCK_REGISTER_USER });

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.registerSuccess action, when register succeeds', () => {
      const completion = AuthActions.registerSuccess({
        successText: `Verification Email Sent To ${MOCK_REGISTER_USER.email}`,
        redirectTo: ROUTES_DATA.ARTICLES.url,
      });

      const response = cold('-a|', {
        a: {
          data: {},
        },
      });
      const expected = cold('--c', { c: completion });

      authService.register = jest.fn(() => response);
      expect(effects.register$).toBeObservable(expected);
    });

    it('should return a new AuthActions.registerFailure if the auth service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = AuthActions.registerFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.register = jest.fn(() => response);
      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    beforeEach(() => {
      const action = AuthActions.logout();

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.logoutSuccess action, when logout succeeds', () => {
      const completion = AuthActions.logoutSuccess();

      const response = cold('-a|', {
        a: {
          data: {},
        },
      });
      const expected = cold('--c', { c: completion });

      authService.logout = jest.fn(() => response);
      expect(effects.logout$).toBeObservable(expected);
    });
  });

  describe('loadUserProfile$', () => {
    beforeEach(() => {
      const action = AuthActions.loadUserProfile();

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.loadUserProfileSuccess action, with user and providers if request succeeds', () => {
      const completion = AuthActions.loadUserProfileSuccess({
        currentUser: MOCK_USER,
        providers: { facebook: true },
      });

      const response = cold('-a|', {
        a: {
          currentUser: MOCK_USER,
          providers: { facebook: true },
        },
      });
      const expected = cold('--c', { c: completion });

      authService.getCurrentUser = jest.fn(() => response);

      expect(effects.loadUserProfile$).toBeObservable(expected);
    });

    it('should return a new AuthActions.loadUserProfileFailure if the auth service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = AuthActions.loadUserProfileFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.getCurrentUser = jest.fn(() => response);
      expect(effects.loadUserProfile$).toBeObservable(expected);
    });
  });

  describe('forgotPassword$', () => {
    beforeEach(() => {
      const action = AuthActions.forgotPassword({ email: MOCK_USER.email });

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.forgotPasswordSuccess action, when request succeeds', () => {
      const completion = AuthActions.forgotPasswordSuccess({
        successText: `Password Reset Email Sent To ${MOCK_USER.email}`,
        redirectTo: ROUTES_DATA.AUTH.children.SIGN_IN.url,
      });

      const response = cold('-a|', {
        a: {
          currentUser: MOCK_USER,
          providers: { facebook: true },
        },
      });
      const expected = cold('--c', { c: completion });

      authService.passwordForgotten = jest.fn(() => response);

      expect(effects.forgotPassword$).toBeObservable(expected);
    });

    it('should return a new AuthActions.forgotPasswordFailure if the auth service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = AuthActions.forgotPasswordFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.passwordForgotten = jest.fn(() => response);
      expect(effects.forgotPassword$).toBeObservable(expected);
    });
  });

  describe('resetPassword$', () => {
    beforeEach(() => {
      const action = AuthActions.resetPassword({
        actionCode: 'actionCode',
        newPassword: 'newPassword',
        email: MOCK_USER.email,
      });

      actions$ = hot('-a', { a: action });
    });
    it('should return an AuthActions.resetPasswordSuccess action, when request succeeds', () => {
      const completion = AuthActions.resetPasswordSuccess();

      const response = cold('-a|', {
        a: {
          currentUser: MOCK_USER,
          providers: { facebook: true },
        },
      });
      const expected = cold('--c', { c: completion });

      authService.resetPassword = jest.fn(() => response);

      expect(effects.resetPassword$).toBeObservable(expected);
    });

    it('should return a new AuthActions.resetPasswordFailure if the auth service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = AuthActions.resetPasswordFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      authService.resetPassword = jest.fn(() => response);
      expect(effects.resetPassword$).toBeObservable(expected);
    });
  });
  describe('loginRedirect$', () => {
    it(`should return an AuthActions.loadUserProfile action and call RouterNavigation
      when AuthActions.loginWithGoogleSuccess is dispatched`, () => {
      const action = AuthActions.loginWithGoogleSuccess();
      const completion = AuthActions.loadUserProfile();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loginRedirect$).toBeObservable(expected);

      expect(router).toHaveBeenCalledWith(ROUTES_DATA.ARTICLES.url);
    });
    it(`should return an AuthActions.loadUserProfile action and call RouterNavigation
      when AuthActions.loginWithFacebookSuccess is dispatched`, () => {
      const action = AuthActions.loginWithFacebookSuccess();
      const completion = AuthActions.loadUserProfile();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loginRedirect$).toBeObservable(expected);

      expect(router).toHaveBeenCalledWith(ROUTES_DATA.ARTICLES.url);
    });
    it(`should return an AuthActions.loadUserProfile action and call RouterNavigation
      when AuthActions.loginWithCredentialsSuccess is dispatched`, () => {
      const action = AuthActions.loginWithCredentialsSuccess();
      const completion = AuthActions.loadUserProfile();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loginRedirect$).toBeObservable(expected);

      expect(router).toHaveBeenCalledWith(ROUTES_DATA.ARTICLES.url);
    });
    it(`should return an AuthActions.loadUserProfile action and call RouterNavigation
      when AuthActions.resetPasswordSuccess is dispatched`, () => {
      const action = AuthActions.resetPasswordSuccess();
      const completion = AuthActions.loadUserProfile();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loginRedirect$).toBeObservable(expected);

      expect(router).toHaveBeenCalledWith(ROUTES_DATA.ARTICLES.url);
    });
  });
  describe('sentEmailVerification$', () => {
    let dialogOpen;
    beforeEach(() => {
      dialogOpen = jest.spyOn(dialog, 'open');
    });
    it(`should return an AuthActions.loadUserProfile action and calls RouterNavigation, DialogOpen
      when AuthActions.registerSuccess is dispatched`, () => {
      const action = AuthActions.registerSuccess({
        successText: 'successText',
        redirectTo: '/',
      });
      const completion = AuthActions.loadUserProfile();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.sentEmailVerification$).toBeObservable(expected);

      expect(dialogOpen).toHaveBeenCalled();
      expect(router).toHaveBeenCalledWith('/');
    });
    it(`should return an AuthActions.loadUserProfile action and calls RouterNavigation, DialogOpen
      when AuthActions.forgotPasswordSuccess is dispatched`, () => {
      const action = AuthActions.forgotPasswordSuccess({
        successText: 'successText',
        redirectTo: '/',
      });
      const completion = AuthActions.loadUserProfile();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.sentEmailVerification$).toBeObservable(expected);

      expect(dialogOpen).toHaveBeenCalled();
      expect(router).toHaveBeenCalledWith('/');
    });
  });
  describe('logoutSuccess$', () => {
    it('should call RouterNavigation action when AuthActions.logoutSuccess is dispatched', (done) => {
      const action = AuthActions.logoutSuccess();

      actions$ = of(action);

      effects.logoutSuccess$.subscribe(() => {
        expect(router).toHaveBeenCalledWith(
          ROUTES_DATA.AUTH.children.SIGN_IN.url
        );
        done();
      });
    });
  });

  describe('handleError$', () => {
    it(`should call SnackbarOpen when is dispatched action from list:
        AuthActions.loginWithCredentialsFailure,
        AuthActions.loginWithGoogleFailure,
        AuthActions.loginWithFacebookFailure,
        AuthActions.registerFailure,
        AuthActions.loadUserProfileFailure,
        AuthActions.forgotPasswordFailure,
        AuthActions.resetPasswordFailure,
        AuthActions.verifyEmailAddressFailure.
      `, (done: any) => {
      const snackbarOpen = jest.spyOn(snackBar, 'open');

      const error = MOCK_FIREBASE_ERROR;
      actions$ = of(
        AuthActions.loginWithCredentialsFailure({ error }),
        AuthActions.loginWithGoogleFailure({ error }),
        AuthActions.loginWithFacebookFailure({ error }),
        AuthActions.registerFailure({ error }),
        AuthActions.loadUserProfileFailure({ error }),
        AuthActions.forgotPasswordFailure({ error }),
        AuthActions.resetPasswordFailure({ error }),
        AuthActions.verifyEmailAddressFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledWith(MOCK_FIREBASE_ERROR.message);
        done();
      });
    });
    it(`should not call SnackbarOpen when is dispatched action without message from list:
        AuthActions.loginWithCredentialsFailure,
        AuthActions.loginWithGoogleFailure,
        AuthActions.loginWithFacebookFailure,
        AuthActions.registerFailure,
        AuthActions.loadUserProfileFailure,
        AuthActions.forgotPasswordFailure,
        AuthActions.resetPasswordFailure,
        AuthActions.verifyEmailAddressFailure.
      `, (done: any) => {
      const snackbarOpen = jest.spyOn(snackBar, 'open');

      const error = { ...MOCK_FIREBASE_ERROR, message: null };
      actions$ = of(
        AuthActions.loginWithCredentialsFailure({ error }),
        AuthActions.loginWithGoogleFailure({ error }),
        AuthActions.loginWithFacebookFailure({ error }),
        AuthActions.registerFailure({ error }),
        AuthActions.loadUserProfileFailure({ error }),
        AuthActions.forgotPasswordFailure({ error }),
        AuthActions.resetPasswordFailure({ error }),
        AuthActions.verifyEmailAddressFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
