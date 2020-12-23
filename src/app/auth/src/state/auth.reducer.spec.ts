import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NbAuthResult} from '@nebular/auth';
import {Action, on} from '@ngrx/store';
import {
  ApiErrorMessage,
  ApiErrorResponse,
  DEMO_EXCEPTION_ERROR,
  ERROR_MESSAGES,
} from '@pentegra/core';
import {mockUserInfo, mockUserProfile} from '@pentegra/testing';
import {AuthActions} from './auth.actions';
import {AuthState, initialState, reducer} from './auth.reducer';

describe('Auth Reducer', () => {
  const resp200 = new HttpResponse({
    body: {
      data: {
        privilege: ['SOME_PRIVILEGES'],
      },
    },
    status: 200,
  });
  const resp401 = new HttpErrorResponse({
    status: 401,
    error: DEMO_EXCEPTION_ERROR,
  });
  const failResult = new NbAuthResult(false, resp401, null, [
    ERROR_MESSAGES.default,
  ]);
  const mockExeption: ApiErrorMessage = {
    title: 'some title',
    errorMessage: ERROR_MESSAGES.default,
  };
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

  it('should return the default state', () => {
    const action = {} as Action;

    const state: AuthState = reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should reset all errors fields in state', () => {
    const actions = [
      AuthActions.checkToken,
      AuthActions.checkUrlToken,
      AuthActions.login,
      AuthActions.requestPassword,
      AuthActions.resetPassword,
      AuthActions.register,
      AuthActions.completeRegistration,
      AuthActions.requestAccountUserInfo,
      AuthActions.requestAccountApprove,
      AuthActions.requestAccountReject,
      AuthActions.updateProfile,
    ];

    actions.forEach(action => {
      const state: AuthState = reducer(initialState, action as Action);

      expect(state.errors).toEqual([]);
      expect(state.errorFields).toEqual([]);
      expect(state.exception).toBe(null);
      expect(state.pending).toBe(true);
    });
  });

  it('should reset all errors fields and set privilege and role to state when login was succeed', () => {
    const action = AuthActions.loginSuccess({result: successResult});

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.errors).toBe(null);
    expect(state.exception).toBe(null);
    expect(state.pending).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.privilege).toEqual(
      successResult.getResponse().body.data.privilege
    );
  });

  it('should set tokenChecked and isAuthenticated to value "true" when check token was succeed', () => {
    const action = AuthActions.checkTokenSuccess;

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.tokenChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should set emailToken when action setEmailToken was succeed', () => {
    const mockToken = 'some token';
    const action = AuthActions.setEmailToken({token: mockToken});

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.emailToken.token).toBe(mockToken);
    expect(state.emailToken.type).toBe('[Auth] Set Email Token');
  });

  it('should set tokenChecked and isAuthenticated to value "false" when check token was failed', () => {
    const action = AuthActions.checkTokenFailure;

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.tokenChecked).toBe(false);
    expect(state.isAuthenticated).toBe(false);
  });

  it('should reset all fields in state when actions failure triggered', () => {
    const actions = [
      AuthActions.loginFailure,
      AuthActions.requestPasswordFailure,
      AuthActions.resetPasswordFailure,
      AuthActions.checkUrlTokenFailure,
      AuthActions.completeRegistrationFailure,
      AuthActions.requestAccountRejectFailure,
      AuthActions.requestAccountApproveFailure,
      AuthActions.requestAccountUserInfoFailure,
      AuthActions.loadUserProfileFailure,
    ];

    actions.forEach(action => {
      const state: AuthState = reducer(
        initialState,
        action({errors: failResult.getErrors()}) as Action
      );

      expect(state.pending).toBe(false);
      expect(state.requestPasswordReset).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.errors).toEqual(failResult.getErrors());
    });
  });

  it('should set requestPasswordReset to value "true" when request password was succeed', () => {
    const action = AuthActions.requestPasswordSuccess;

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.requestPasswordReset).toBe(true);
  });

  it('should set pending to value "true" when actions succeed triggered', () => {
    const actions = [
      AuthActions.resetPasswordSuccess,
      AuthActions.registerSuccess,
      AuthActions.completeRegistrationSuccess,
      AuthActions.requestAccountApproveSuccess,
      AuthActions.requestAccountRejectSuccess,
    ];

    actions.forEach(action => {
      const state: AuthState = reducer(initialState, action as Action);

      expect(state.pending).toBe(false);
    });
  });

  it('should set pending to value "true" when logout action was triggered', () => {
    const action = AuthActions.logout;

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(true);
  });

  it('should reset to default state', () => {
    const actions = [AuthActions.loginRedirect, AuthActions.authNavigate];

    actions.forEach(action => {
      const state: AuthState = reducer(initialState, action as Action);
      expect(state).toEqual(initialState);
    });
  });

  it('should set exception when authFailureWithException action was triggered', () => {
    const action = AuthActions.authFailureWithException({
      exception: mockExeption,
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.exception).toEqual(mockExeption);
  });

  it('should set registrationCompleteEmail when checkUrlTokenSuccess action was triggered', () => {
    const action = AuthActions.checkUrlTokenSuccess({
      email: mockUserInfo.email,
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.registrationCompleteEmail).toEqual(mockUserInfo.email);
  });

  it('should set requestAccountUserInfo when requestAccountUserInfoSuccess action was triggered', () => {
    const action = AuthActions.requestAccountUserInfoSuccess({
      userData: {
        data: mockUserInfo,
      },
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.requestAccountUserInfo).toEqual({
      ...mockUserInfo,
      status: 'Pending',
    });
  });

  it('should set user when loadUserProfileSuccess action was triggered', () => {
    const action = AuthActions.loadUserProfileSuccess({
      currentUser: mockUserProfile,
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.user).toEqual({
      ...mockUserProfile,
    });
    expect(state.errors).toEqual([]);
    expect(state.errorFields).toEqual([]);
    expect(state.userLoaded).toBe(true);
  });

  it('should set errors when commonAuthFailure action was triggered', () => {
    const action = AuthActions.commonAuthFailure({
      errors: failResult.getErrors(),
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.errors).toEqual(failResult.getErrors());
  });

  it('should reset errors variables when cancelEditProfile action was triggered', () => {
    const action = AuthActions.cancelEditProfile;

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.errors).toEqual([]);
    expect(state.errorFields).toEqual([]);
  });

  it('should update user when updateProfileSuccess action was triggered', () => {
    const action = AuthActions.updateProfileSuccess({
      user: mockUserProfile,
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.user).toEqual({
      ...mockUserProfile,
    });
    expect(state.errors).toEqual([]);
    expect(state.errorFields).toEqual([]);
  });

  it('should set errorFields when updateProfileFailure action was triggered', () => {
    const action = AuthActions.updateProfileFailure({
      error: apiError,
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.errorFields).toEqual(apiError.getErrorFields());
  });

  it('should set errorFields when registerFailure action was triggered', () => {
    const action = AuthActions.registerFailure({
      error: apiError,
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.requestPasswordReset).toBe(false);
    expect(state.errorFields).toEqual(apiError.getErrorFields());
  });

  it('should reset all errors when resetErrors action was triggered', () => {
    const action = AuthActions.resetErrors;

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.errors).toEqual([]);
    expect(state.errorFields).toEqual([]);
  });

  it('should set all errors when setErrors action was triggered', () => {
    const mockErrors = ['some error'];
    const mockErrorFields = ['some error message'];
    const action = AuthActions.setErrors({
      errors: mockErrors,
      errorFields: mockErrorFields,
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.errors).toEqual(mockErrors);
    expect(state.errorFields).toEqual(mockErrorFields);
  });
});
