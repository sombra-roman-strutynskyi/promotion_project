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
  error: string;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  userLoaded: false,
  requestPasswordReset: false,
  pending: false,
  error:null,
};

const authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginWithCredentials,
    AuthActions.loginWithFacebook,
    AuthActions.loginWithGoogle,

    // AuthActions.register,
    AuthActions.changePassword,
    AuthActions.resetPassword,
    AuthActions.uploadUserAvatar,
    AuthActions.updateUserProfile,
    (state) => ({
      ...state,
      errors: null,
      pending: true,
    })
  ),
  on(
    AuthActions.loginWithCredentialsSuccess,
    AuthActions.resetPasswordSuccess,
    AuthActions.changePasswordSuccess,
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
    AuthActions.resetPasswordFailure,
    AuthActions.loadUserProfileFailure,
    AuthActions.updateUserProfileFailure,
    AuthActions.uploadUserAvatarFailure,
    AuthActions.registerFailure,
    AuthActions.changePasswordFailure,
    (state, { error }) => ({
      ...state,
      error:error?.message || null,
      pending: false,
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
  on(AuthActions.logoutSuccess, () => initialState),
  on(
    AuthActions.loadUserProfileSuccess,
    AuthActions.updateUserProfileSuccess,
    AuthActions.uploadUserAvatarSuccess,
    (state, { currentUser }) => ({
      ...state,
      user: { ...currentUser },
      pending: false,
      error: null,
      userLoaded: true,
    })
  ),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
