import { Action, createReducer, on } from '@ngrx/store';
import { IUser, ProviderType } from '../models';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';
export interface AuthState {
  user: IUser | null;
  userLoaded: boolean;
  pending: boolean;
  error: string;
  providerType: ProviderType;
}

export const initialState: AuthState = {
  user: null,
  userLoaded: false,
  pending: false,
  error: null,
  providerType: null,
};

const authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginWithCredentials,
    AuthActions.loginWithFacebook,
    AuthActions.loginWithGoogle,
    AuthActions.register,
    AuthActions.forgotPassword,
    (state) => ({
      ...state,
      errors: null,
      pending: true,
    })
  ),
  on(
    AuthActions.loginWithCredentialsSuccess,
    AuthActions.forgotPasswordSuccess,
    AuthActions.registerSuccess,
    (state) => ({
      ...state,
      error: null,
      pending: false,
    })
  ),

  on(
    AuthActions.loginWithCredentialsFailure,
    AuthActions.loginWithGoogleFailure,
    AuthActions.loginWithFacebookFailure,
    AuthActions.forgotPasswordFailure,
    AuthActions.loadUserProfileFailure,
    AuthActions.registerFailure,
    (state, { error }) => ({
      ...state,
      error: error?.message || null,
      pending: false,
    })
  ),
  on(AuthActions.logout, (state) => ({
    ...state,
    pending: true,
  })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(
    AuthActions.loadUserProfileSuccess,
    (state, { currentUser, providerType }) => ({
      ...state,
      user: { ...currentUser },
      providerType,
      pending: false,
      error: null,
      userLoaded: true,
    })
  )
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
