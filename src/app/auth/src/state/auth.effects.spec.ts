// tslint:disable:ban-types prefer-const no-angle-bracket-type-assertion
import {Location} from '@angular/common';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {SpyLocation} from '@angular/common/testing';
import {TestBed} from '@angular/core/testing';
import {Router, ActivatedRoute} from '@angular/router';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {Actions} from '@ngrx/effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {MemoizedSelector, Store} from '@ngrx/store';
import {cold, hot} from '@nrwl/angular/testing';
import {
  ApiErrorResponse,
  CoreService,
  DEMO_EXCEPTION_ERROR,
  ERROR_MESSAGES,
  WHITE_ROUTES_LIST,
} from '@pentegra/core';
import {
  CoreServiceMock,
  ModalServiceMock,
  MockStoreModule,
  mockUserInfo,
  mockUserProfile,
  activateRouteMockFactory,
  RouterMock,
  AuthFacadeMock,
} from '@pentegra/testing';
import {UiModalService} from '@pentegra/ui';
import {TsWindowService} from '@terminus/ngx-tools';
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';
import {Observable, of} from 'rxjs';
import {
  CompleteRegistrationCredentials,
  Credentials,
  ResetPasswordCredentials,
} from '../models';
import {AuthApiService, AuthFacade} from '../services';
import {AuthState, initialState} from './auth.reducer';
import {AuthActions} from './auth.actions';
import {AuthEffects} from './auth.effects';

// mock modal service
const mockAuthApiService = {
  checkToken: jest.fn(),
};
const mockNgxPermissionsService = {
  flushPermissions: jest.fn(),
  addPermission: jest.fn(),
};
const mockNgxRolesService = {
  addRole: jest.fn(),
  flushRoles: jest.fn(),
};

describe('AuthEffects', () => {
  let store: Store<any>;
  let effects: AuthEffects;
  let authService: NbAuthService;
  let actions$: Observable<any>;
  let routerService: Partial<Router>;
  let router;
  let location;
  let modalService;
  let authApiService: Partial<AuthApiService>;
  let ngxPermissionsService: NgxPermissionsService;
  let ngxRolesService: NgxRolesService;
  let windowService: TsWindowService;
  let authenticated: MemoizedSelector<AuthState, boolean>;

  const resp200 = new HttpResponse({body: {}, status: 200});
  const resp401 = new HttpErrorResponse({
    status: 401,
    error: DEMO_EXCEPTION_ERROR,
  });
  const apiError = new ApiErrorResponse(resp401);
  const redirectUrl = '/';
  const successResult = new NbAuthResult(
    true,
    resp200,
    redirectUrl,
    [],
    ['Success'],
    null
  );

  const mockFileUploadSuccessData = {
    body: {
      data: {
        photoUrl: '/some-url',
      },
    },
    type: 4,
  };

  const failResult = new NbAuthResult(false, resp401, null, [
    ERROR_MESSAGES.default,
  ]);

  const mockBlob = new Blob([''], {type: 'image/png'});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockStoreModule.forRoot('auth', {initialState})],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: Location,
          useClass: SpyLocation,
        },
        {
          provide: ActivatedRoute,
          useFactory: activateRouteMockFactory({
            snapshot: {
              queryParams: {
                token: null,
              },
            },
          }),
        },
        {
          provide: NbAuthService,
          useValue: {authenticate: jest.fn(), logout: jest.fn()} as Partial<NbAuthService>,
        },
        {provide: UiModalService, useClass: ModalServiceMock},
        {provide: CoreService, useClass: CoreServiceMock},
        {provide: AuthApiService, useValue: mockAuthApiService},
        {provide: NgxPermissionsService, useValue: mockNgxPermissionsService},
        {provide: NgxRolesService, useValue: mockNgxRolesService},
        {provide: WHITE_ROUTES_LIST, useValue: []},
        {provide: AuthFacade, useClass: AuthFacadeMock},
      ],
    });

    store = TestBed.inject(Store);
    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(NbAuthService);
    actions$ = TestBed.inject(Actions);
    ngxPermissionsService = TestBed.inject(NgxPermissionsService);
    ngxRolesService = TestBed.inject(NgxRolesService);
    routerService = TestBed.inject(Router);
    // create a spy to verify the navigation will be called
    router = jest.spyOn(routerService, 'navigateByUrl');
    location = TestBed.inject(Location);
    modalService = TestBed.inject(UiModalService);
    authApiService = TestBed.inject(AuthApiService);
    windowService = TestBed.inject(TsWindowService);
  });

  describe('login$', () => {
    it('should return an auth.loginSuccess action, with user information if login succeeds', () => {
      const credentials: Credentials = {email: 'test', password: ''};
      const action = AuthActions.login({credentials});
      const completion = AuthActions.loginSuccess({
        result: successResult,
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successResult});
      const expected = cold('--b', {b: completion});
      authService.authenticate = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a new auth.loginFailure if the login service throws', () => {
      const credentials: Credentials = {email: 'someOne', password: ''};
      const action = AuthActions.login({credentials});
      const completion = AuthActions.loginFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      // const response = cold('-#', {}, { errors: failResult.getErrors() });
      const response = cold('-a|', {a: failResult});
      const expected = cold('--b', {b: completion});
      authService.authenticate = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should dispatch a RouterNavigation action after login', (done: any) => {
      const action = AuthActions.loginSuccess({
        result: successResult,
      });

      actions$ = of(action);

      // TODO: test DFE specific logic

      effects.loginSuccess$.subscribe(() => {
        expect(router).toHaveBeenCalledWith(redirectUrl);
        done();
      });
    });
  });

  describe('authNavigate$', () => {
    it('should dispatch a RouterNavigation action on demand', (done: any) => {
      const action = AuthActions.authNavigate({
        route: 'request-password',
      });

      actions$ = of(action);

      effects.authNavigate$.subscribe(() => {
        expect(router).toHaveBeenCalledWith('/auth/request-password');
        done();
      });
    });
  });

  describe('loginRedirect$', () => {
    it('should dispatch a RouterNavigation action when auth.loginRedirect is dispatched', (done: any) => {
      const action = AuthActions.loginRedirect();

      actions$ = of(action);

      effects.loginRedirect$.subscribe(() => {
        expect(router).toHaveBeenCalledWith('/auth/login');
        done();
      });
    });
  });

  describe('logout$', () => {
    it('should dispatch a loginRedirect action when auth.logout is dispatched', () => {
      const action = AuthActions.logout();
      const completion = AuthActions.loginRedirect();

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successResult});
      const expected = cold('--b', {b: completion});
      authService.logout = jest.fn(() => response);

      expect(effects.logout$).toBeObservable(expected);
    });
  });

  describe('logoutConfirmation$', () => {
    it('should dispatch a Logout action if dialog closes with true result', () => {
      const action = AuthActions.logoutConfirmation();
      const completion = AuthActions.logout();

      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      modalService.create = () => ({
        open: () => ({
          onClose: of(true),
        }),
      });

      expect(effects.logoutConfirmation$).toBeObservable(expected);
    });
    it('should dispatch a LogoutConfirmationDismiss action if dialog closes with falsy result', () => {
      const action = AuthActions.logoutConfirmation();
      const completion = AuthActions.logoutConfirmationDismiss();

      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      modalService.create = () => ({
        open: () => ({
          onClose: of(false),
        }),
      });

      expect(effects.logoutConfirmation$).toBeObservable(expected);
    });
  });

  describe('requestPassword$', () => {
    it('should return an auth.requestPasswordSuccess action, with success message if reset password succeeds', () => {
      const email = 'test';
      const action = AuthActions.requestPassword({email});
      const completion = AuthActions.requestPasswordSuccess({
        result: successResult,
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successResult});
      const expected = cold('--b', {b: completion});
      authService.requestPassword = jest.fn(() => response);

      expect(effects.requestPassword$).toBeObservable(expected);
    });

    it('should return a new auth.requestPasswordFailure if the auth service throws', () => {
      const email = 'test';
      const action = AuthActions.requestPassword({email});
      const completion = AuthActions.requestPasswordFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: failResult});
      const expected = cold('--b', {b: completion});
      authService.requestPassword = jest.fn(() => response);
      effects['getActionForAuthApiError'] = jest.fn(() =>
        AuthActions.requestPasswordFailure({
          errors: failResult.getErrors(),
        })
      );
      expect(effects.requestPassword$).toBeObservable(expected);
    });
  });

  describe('checkToken$', () => {
    it('should return an auth.checkTokenSuccess action, if the token is valid', () => {
      const action = AuthActions.checkToken();
      const completion = AuthActions.checkTokenSuccess();

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: true});
      const expected = cold('--b', {b: completion});
      authService.isAuthenticated = jest.fn(() => response);

      expect(effects.checkToken$).toBeObservable(expected);
    });

    it('should return an auth.checkTokenFailure action, if the token is not valid', () => {
      const action = AuthActions.checkToken();
      const completion = AuthActions.checkTokenFailure();

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: false});
      const expected = cold('--b', {b: completion});
      authService.isAuthenticated = jest.fn(() => response);

      expect(effects.checkToken$).toBeObservable(expected);
    });
  });

  describe('actionsSuccess$', () => {
    it('should dispatch a RouterNavigation action when auth.registerSuccess or auth.resetPasswordSuccess is dispatched', (done: any) => {
      const registerSuccessAction = AuthActions.registerSuccess({
        result: successResult,
      });
      const resetPasswordSuccessAction = AuthActions.resetPasswordSuccess({
        result: successResult,
      });

      actions$ = of(registerSuccessAction, resetPasswordSuccessAction);

      effects.actionsSuccess$.subscribe(() => {
        expect(router).toHaveBeenCalledWith(redirectUrl);
        done();
      });
    });
  });

  describe('resetPassword$', () => {
    it('should return an auth.resetPasswordSuccess action if reset password succeeds', () => {
      const credentials: ResetPasswordCredentials = {
        password: 'password',
        confirmPassword: 'password',
        token: '',
      };
      const action = AuthActions.resetPassword({credentials});
      const completion = AuthActions.resetPasswordSuccess({
        result: successResult,
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successResult});
      const expected = cold('--b', {b: completion});
      authService.resetPassword = jest.fn(() => response);

      expect(effects.resetPassword$).toBeObservable(expected);
    });

    it('should return a new auth.resetPasswordFailure if the auth service throws', () => {
      const credentials: ResetPasswordCredentials = {
        password: 'password',
        confirmPassword: 'password',
        token: '',
      };
      const action = AuthActions.resetPassword({credentials});
      const completion = AuthActions.resetPasswordFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: failResult});
      const expected = cold('--b', {b: completion});
      authService.resetPassword = jest.fn(() => response);
      effects['getActionForAuthApiError'] = jest.fn(() =>
        AuthActions.resetPasswordFailure({
          errors: failResult.getErrors(),
        })
      );
      expect(effects.resetPassword$).toBeObservable(expected);
    });
  });

  describe('checkTokenSuccess$', () => {
    it('should dispatch a loadUserProfile action when auth.checkTokenSuccess is dispatched', () => {
      const action = AuthActions.checkTokenSuccess();
      const completion = AuthActions.loadUserProfile();

      actions$ = hot('-a--', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.checkTokenSuccess$).toBeObservable(expected);
    });
  });

  describe('logoutIdleUser$', () => {
    it('should dispatch a auth.logout action when auth.idleTimeout is dispatched', () => {
      const action = AuthActions.idleTimeout();
      const completion = AuthActions.logout();

      actions$ = hot('-a--', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.logoutIdleUser$).toBeObservable(expected);
    });
  });

  describe('completeRegistration$', () => {
    it('should return an auth.completeRegistrationSuccess action if complete registration succeeds', () => {
      const credentials: CompleteRegistrationCredentials = {
        password: 'password',
        confirmPassword: 'password',
        email: 'admin@test.com',
      };
      const action = AuthActions.completeRegistration({credentials});
      const completion = AuthActions.completeRegistrationSuccess({
        result: successResult,
      });

      effects.isDfe = false;
      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successResult});
      const expected = cold('--b', {b: completion});
      authApiService.completeRegistration = jest.fn(() => response);

      expect(effects.completeRegistration$).toBeObservable(expected);
    });
  });

  describe('completeRegistrationSuccess$', () => {
    it('should dispatch a RouterNavigation action when auth.completeRegistrationSuccess is dispatched', (done: any) => {
      const action = AuthActions.completeRegistrationSuccess({
        result: successResult,
      });

      actions$ = of(action);

      effects.completeRegistrationSuccess$.subscribe(() => {
        expect(router).toHaveBeenCalledWith(redirectUrl);
        done();
      });
    });
  });

  describe('register$', () => {
    it('should return an auth.registerSuccess action if register succeeds', () => {
      const action = AuthActions.register({credentials: mockUserInfo});
      const completion = AuthActions.registerSuccess({
        result: successResult,
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successResult});
      const expected = cold('--b', {b: completion});
      authService.register = jest.fn(() => response);

      expect(effects.register$).toBeObservable(expected);
    });

    it('should return a new auth.registerFailure if the auth service throws', () => {
      const action = AuthActions.register({credentials: mockUserInfo});
      const completion = AuthActions.registerFailure({
        error: failResult.getResponse(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: failResult});
      const expected = cold('--b', {b: completion});
      authService.register = jest.fn(() => response);
      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('checkUrlToken$', () => {
    it('should return an auth.checkUrlTokenSuccess action if token is valid', () => {
      const action = AuthActions.checkUrlToken();
      const completion = AuthActions.checkUrlTokenSuccess({
        email: mockUserInfo.email,
      });
      const successData = {
        data: mockUserInfo.email,
      };

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successData});
      const expected = cold('--b', {b: completion});
      authApiService.checkToken = jest.fn(() => response);
      expect(effects.checkUrlToken$).toBeObservable(expected);
    });

    it('should return a new auth.checkUrlTokenFailure if the auth service throws', () => {
      const action = AuthActions.checkUrlToken();
      const completion = AuthActions.checkUrlTokenFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, failResult);
      const expected = cold('--b', {b: completion});
      authApiService.checkToken = jest.fn(() => response);
      effects['getActionForAuthApiError'] = jest.fn(() =>
        AuthActions.checkUrlTokenFailure({
          errors: failResult.getErrors(),
        })
      );
      expect(effects.checkUrlToken$).toBeObservable(expected);
    });
  });

  describe('requestAccountUserInfo$', () => {
    it('should return an auth.requestAccountUserInfo action', () => {
      const action = AuthActions.requestAccountUserInfo();
      const completion = AuthActions.requestAccountUserInfoSuccess({
        userData: mockUserInfo,
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: mockUserInfo});
      const expected = cold('--b', {b: completion});
      authApiService.requestAccountUser = jest.fn(() => response);
      expect(effects.requestAccountUserInfo$).toBeObservable(expected);
    });

    it('should return a new auth.requestAccountUserInfoFailure if the auth service throws', () => {
      const action = AuthActions.requestAccountUserInfo();
      const completion = AuthActions.requestAccountUserInfoFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, failResult);
      const expected = cold('--b', {b: completion});
      authApiService.requestAccountUser = jest.fn(() => response);
      effects['getActionForAuthApiError'] = jest.fn(() =>
        AuthActions.requestAccountUserInfoFailure({
          errors: failResult.getErrors(),
        })
      );
      expect(effects.requestAccountUserInfo$).toBeObservable(expected);
    });
  });

  describe('requestAccountApprove$', () => {
    it('should return an auth.requestAccountApprove action if account was approved', () => {
      const formData = new FormData();
      const action = AuthActions.requestAccountApprove({formData});
      const completion = AuthActions.requestAccountApproveSuccess();

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: mockUserInfo});
      const expected = cold('--b', {b: completion});
      authApiService.approveRequestAccount = jest.fn(() => response);
      expect(effects.requestAccountApprove$).toBeObservable(expected);
    });

    it('should return a new auth.requestAccountApproveFailure if the auth service throws', () => {
      const formData = new FormData();
      const action = AuthActions.requestAccountApprove({formData});
      const completion = AuthActions.requestAccountApproveFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, failResult);
      const expected = cold('--b', {b: completion});
      authApiService.approveRequestAccount = jest.fn(() => response);
      effects['getActionForAuthApiError'] = jest.fn(() =>
        AuthActions.requestAccountApproveFailure({
          errors: failResult.getErrors(),
        })
      );
      expect(effects.requestAccountApprove$).toBeObservable(expected);
    });
  });

  describe('requestAccountReject$', () => {
    it('should return an auth.requestAccountReject$ action if account was rejected', () => {
      const action = AuthActions.requestAccountReject();
      const completion = AuthActions.requestAccountRejectSuccess();

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: mockUserInfo});
      const expected = cold('--b', {b: completion});
      authApiService.rejectRequestAccount = jest.fn(() => response);
      expect(effects.requestAccountReject$).toBeObservable(expected);
    });

    it('should return a new auth.requestAccountRejectFailure if the auth service throws', () => {
      const action = AuthActions.requestAccountReject();
      const completion = AuthActions.requestAccountRejectFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, failResult);
      const expected = cold('--b', {b: completion});
      authApiService.rejectRequestAccount = jest.fn(() => response);
      effects['getActionForAuthApiError'] = jest.fn(() =>
        AuthActions.requestAccountRejectFailure({
          errors: failResult.getErrors(),
        })
      );
      expect(effects.requestAccountReject$).toBeObservable(expected);
    });
  });

  describe('requestAccountSuccess$', () => {
    it('should dispatch a RouterNavigation action when auth.requestAccountSuccess$ is dispatched', (done: any) => {
      const requestAccountApproveSuccessAction = AuthActions.requestAccountApproveSuccess();
      const requestAccountRejectSuccessAction = AuthActions.requestAccountRejectSuccess();

      actions$ = of(
        requestAccountApproveSuccessAction,
        requestAccountRejectSuccessAction
      );

      effects.requestAccountSuccess$.subscribe(() => {
        expect(router).toHaveBeenCalledWith(redirectUrl);
        done();
      });
    });
  });

  describe('userProfile$', () => {
    it('should return an auth.loadUserProfileSuccess action if user profile was loaded', () => {
      const action = AuthActions.loadUserProfile();
      const completion = AuthActions.loadUserProfileSuccess({
        currentUser: mockUserProfile,
      });
      const successData = {
        data: mockUserProfile,
      };

      actions$ = hot('-a---', {a: action});
      const response = cold('-a|', {a: successData});
      const expected = cold('--b', {b: completion});
      authApiService.getCurrentUser = jest.fn(() => response);

      expect(effects.userProfile$).toBeObservable(expected);
    });

    it('should return a new auth.loadUserProfileFailure if the auth service throws', () => {
      const action = AuthActions.loadUserProfile();
      const completion = AuthActions.loadUserProfileFailure({
        errors: failResult.getErrors(),
      });

      actions$ = hot('-a---', {a: action});
      const response = cold('-#|', {}, failResult);
      const expected = cold('--b', {b: completion});
      authApiService.getCurrentUser = jest.fn(() => response);
      effects['getActionForAuthApiError'] = jest.fn(() =>
        AuthActions.loadUserProfileFailure({
          errors: failResult.getErrors(),
        })
      );
      expect(effects.userProfile$).toBeObservable(expected);
    });
  });

  describe('updateProfile$', () => {
    const userImage = new File([''], 'test.jpg', {type: 'image/jpeg'});
    it('should return an auth.cancelEditProfile action', () => {
      const action = AuthActions.updateProfile({
        userData: mockUserProfile,
        userImage,
      });
      const completion = AuthActions.cancelEditProfile();
      modalService.create = () => {
        return {
          setData: () => {
            return {
              open: () => {
                return {
                  onClose: of(false),
                };
              },
            };
          },
        };
      };
      actions$ = hot('-a---', {a: action});
      const expected = cold('-b', {b: completion});

      expect(effects.updateProfile$).toBeObservable(expected);
    });

    xit('should return an auth.logout action if user profile edited successfully', () => {
      const action = AuthActions.updateProfile({
        userData: {...mockUserProfile, email: 'test02@gmail.com'},
        userImage,
      });
      const completion = AuthActions.logout();
      modalService.create = () => {
        return {
          setData: () => {
            return {
              open: () => {
                return {
                  onClose: of(true),
                };
              },
            };
          },
        };
      };

      actions$ = hot('-a---', {a: action});
      const response = cold('a|', {a: {}});
      const expected = cold('-b', {b: completion});
      authApiService.updateProfileChanges = jest.fn(() => response);
      authApiService.uploadProfileImage = jest.fn(() => response);

      expect(effects.updateProfile$).toBeObservable(expected);
    });

    it('should return a new auth.updateProfileFailure if the auth service throws', () => {
      const action = AuthActions.updateProfile({
        userData: mockUserProfile,
        userImage,
      });
      const completion = AuthActions.updateProfileFailure({
        error: failResult.getResponse(),
      });
      modalService.create = (data = 'test') => {
        return {
          setData: () => {
            return {
              open: () => {
                return {
                  onClose: of(true),
                };
              },
            };
          },
        };
      };

      actions$ = hot('-a---', {a: action});
      const response = cold('#|', {}, failResult.getResponse());
      const expected = cold('-b', {b: completion});
      authApiService.updateProfileChanges = jest.fn(() => response);
      authApiService.uploadProfileImage = jest.fn(() => response);
      expect(effects.updateProfile$).toBeObservable(expected);
    });
  });
});
