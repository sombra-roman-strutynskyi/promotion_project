import { createAction, props } from '@ngrx/store';
import { IFirebaseError } from '@shared';
import { ICredentials, IUser, IRegisterUser, IProviders } from '../models';

export const loginWithCredentials = createAction(
  '[Auth] Login With Credentials',
  props<{ credentials: ICredentials }>()
);

export const loginWithCredentialsSuccess = createAction(
  '[Auth] Login With Credentials Success'
);

export const loginWithCredentialsFailure = createAction(
  '[Auth] Login With Credentials Failure',
  props<{ error: IFirebaseError }>()
);

export const loginWithGoogle = createAction('[Auth] Login With Google');

export const loginWithGoogleSuccess = createAction(
  '[Auth] Login With Google Success'
);

export const loginWithGoogleFailure = createAction(
  '[Auth] Login With Google Failure',
  props<{ error: IFirebaseError }>()
);
export const loginWithFacebook = createAction('[Auth] Login With Facebook');

export const loginWithFacebookSuccess = createAction(
  '[Auth] Login With Facebook Success'
);

export const loginWithFacebookFailure = createAction(
  '[Auth] Login With Facebook Failure',
  props<{ error: IFirebaseError }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ user: IRegisterUser }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ successText: string; redirectTo: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: IFirebaseError }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const loadUserProfile = createAction('[Auth] Load User Profile');

export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ currentUser: IUser; providers: IProviders }>()
);

export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: IFirebaseError }>()
);

export const forgotPassword = createAction(
  '[Auth] Forgot Password',
  props<{ email: string }>()
);

export const forgotPasswordSuccess = createAction(
  '[Auth] Forgot Password Success',
  props<{ successText: string; redirectTo: string }>()
);

export const forgotPasswordFailure = createAction(
  '[Auth] Forgot Password Failure',
  props<{ error: IFirebaseError }>()
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ actionCode: string; newPassword: string; email: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: IFirebaseError }>()
);

export const verifyEmailAddress = createAction(
  '[Auth] Verify Email Address',
  props<{ actionCode: string }>()
);

export const verifyEmailAddressSuccess = createAction(
  '[Auth] Verify Email Address Success'
);

export const verifyEmailAddressFailure = createAction(
  '[Auth] Verify Email Address Failure',
  props<{ error: IFirebaseError }>()
);
