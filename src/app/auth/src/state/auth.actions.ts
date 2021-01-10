import { createAction, props } from '@ngrx/store';
import { Credentials, IUser } from '../models';

export const loginWithCredentials = createAction(
  '[Auth] Login With Credentials',
  props<{ credentials: Credentials }>()
);

export const loginWithCredentialsSuccess = createAction(
  '[Auth] Login With Credentials Success',
  props<{ result: any }>()
);

export const loginWithCredentialsFailure = createAction(
  '[Auth] Login With Credentials Failure',
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
  props<{ currentUser: IUser }>()
);

export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ errors: any }>()
);

export const setErrors = createAction(
  '[Auth] Set Errors',
  props<{ errors?: string[] }>()
);

export const loginWithGoogle = createAction('[Auth] Login With Google');

export const loginWithGoogleSuccess = createAction(
  '[Auth] Login With Google Success',
  props<{ payload2Type }>()
);

export const loginWithGoogleFailure = createAction(
  '[Auth] Login With Google Failure',
  props<{ errors: string[] }>()
);
export const loginWithFacebook = createAction('[Auth] Login With Facebook');

export const loginWithFacebookSuccess = createAction(
  '[Auth] Login With Facebook Success',
  props<{ payload2Type }>()
);

export const loginWithFacebookFailure = createAction(
  '[Auth] Login With Facebook Failure',
  props<{ errors: string[] }>()
);

export const AuthActions = {
  loginWithCredentials,
  loginWithCredentialsSuccess,
  loginWithCredentialsFailure,
  loginWithGoogle,
  loginWithGoogleSuccess,
  loginWithGoogleFailure,
  loginWithFacebook,
  loginWithFacebookSuccess,
  loginWithFacebookFailure,
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
