import {createAction, props} from '@ngrx/store';
import {
  Credentials, User,
} from '../models';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: Credentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ result: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errors: string[] }>()
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ credentials }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success',
  props<{ result: any }>()
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ errors: string[] }>()
);
export const register = createAction(
  '[Auth] Register',
  props<{ credentials: any }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ result: any }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);
export const loginRedirect = createAction('[Auth] Login Redirect');
export const logout = createAction('[Auth] Logout');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction(
  '[Auth] Logout Confirmation Dismiss'
);

export const loadUserProfile = createAction('[Auth] Load User Profile');

export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ currentUser: User }>()
);

export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ errors: any }>()
);

export const setErrors = createAction(
  '[Auth] Set Errors',
  props<{ errors?: string[]; }>()
);

export const loginWithGoogle = createAction(
  '[AUTH] Login With Google',
  props<{payloadType}>()
);

export const loginWithGoogleSuccess = createAction(
  '[AUTH] Login With Google Success',
  props<{payload2Type}>()
);

export const loginWithGoogleFailure = createAction(
  '[AUTH] Login With Google Failure',
  props<{payload3Type}>()
);


export const AuthActions = {
  login,
  loginSuccess,
  loginFailure,
  loginRedirect,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  logout,
  logoutConfirmation,
  logoutConfirmationDismiss,
  loadUserProfile,
  loadUserProfileSuccess,
  loadUserProfileFailure,
  setErrors,
};
