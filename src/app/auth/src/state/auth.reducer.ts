import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  userLoaded: boolean;
  requestPasswordReset: boolean;
  pending: boolean;
  errors: string[];
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  userLoaded: false,
  requestPasswordReset: false,
  pending: false,
  errors: [],
};

const authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginWithCredentials,
    // AuthActions.register,
    // AuthActions.resetPassword,
    (state) => ({
      ...state,
      errors: [],
      pending: true,
    })
  ),
  on(AuthActions.loginWithCredentialsSuccess, (state, { result }) => ({
    ...state,
    errors: null,
    pending: false,
    // isAuthenticated: true,
  })),

  on(
    AuthActions.loginWithCredentialsFailure,
    AuthActions.resetPasswordFailure,
    AuthActions.loadUserProfileFailure,
    (state, { errors }) => ({
      ...state,
      errors,
      pending: false,
      isAuthenticated: false,
    })
  ),
  on(
    AuthActions.resetPasswordSuccess,
    AuthActions.registerSuccess,
    (state) => ({
      ...state,
      pending: false,
    })
  ),
  on(AuthActions.logout, (state) => ({
    ...state,
    pending: true,
  })),

  // on(AuthActions.loadUserProfileSuccess, (state, { currentUser }) => ({
  //   ...state,
  //   user: { ...currentUser },
  //   pending: false,
  //   errors: [],
  //   errorFields: [],
  //   userLoaded: true,
  // })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    pending: false,
    isAuthenticated: false,
    requestPasswordReset: false,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}