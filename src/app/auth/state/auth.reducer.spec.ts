import { Action } from '@ngrx/store';
import { MOCK_FIREBASE_ERROR, MOCK_USER } from '@testing';
import * as AuthActions from './auth.actions';
import { AuthState, initialState, reducer } from './auth.reducer';

describe('Auth Reducer', () => {
  it('should return the default state', () => {
    const action = {} as Action;

    const state: AuthState = reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should reset error in state and start pending', () => {
    const actions = [
      AuthActions.loginWithCredentials,
      AuthActions.loginWithFacebook,
      AuthActions.loginWithGoogle,
      AuthActions.register,
      AuthActions.forgotPassword,
    ];

    actions.forEach((action) => {
      const state: AuthState = reducer(initialState, action as Action);

      expect(state.error).toEqual(null);
      expect(state.pending).toBe(true);
    });
  });

  it('should reset error in state and end pending', () => {
    const actions = [
      AuthActions.loginWithCredentialsSuccess,
      AuthActions.forgotPasswordSuccess,
      AuthActions.registerSuccess,
    ];

    actions.forEach((action) => {
      const state: AuthState = reducer(initialState, action as Action);

      expect(state.error).toEqual(null);
      expect(state.pending).toBe(false);
    });
  });

  it('should set pending to value "true" when user logout', () => {
    const action = AuthActions.logout;
    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(true);
  });

  it('should reset to default state', () => {
    const action = AuthActions.logoutSuccess;
    const state: AuthState = reducer(initialState, action as Action);

    expect(state).toEqual(initialState);
  });

  it('should set error message in state when actions failure triggered', () => {
    const actions = [
      AuthActions.loginWithCredentialsFailure,
      AuthActions.loginWithGoogleFailure,
      AuthActions.loginWithFacebookFailure,
      AuthActions.forgotPasswordFailure,
      AuthActions.loadUserProfileFailure,
      AuthActions.registerFailure,
    ];

    actions.forEach((action) => {
      const state: AuthState = reducer(
        initialState,
        action({ error: MOCK_FIREBASE_ERROR }) as Action
      );

      expect(state.pending).toBe(false);
      expect(state.error).toEqual(MOCK_FIREBASE_ERROR.message);
    });
  });

  it('should set user and providers when loadUserProfileSuccess action was triggered', () => {
    const action = AuthActions.loadUserProfileSuccess({
      currentUser: MOCK_USER,
      providers: {
        password: true,
      },
    });

    const state: AuthState = reducer(initialState, action as Action);

    expect(state.pending).toBe(false);
    expect(state.user).toEqual({
      ...MOCK_USER,
    });
    expect(state.providers).toEqual({
      password: true,
      google: false,
      facebook: false,
    });
    expect(state.error).toEqual(null);
    expect(state.userLoaded).toBe(true);
  });
});
