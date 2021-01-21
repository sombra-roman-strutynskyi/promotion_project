import { createAction, props } from '@ngrx/store';
import { ICredentials, IUpdateUser, IUser, IRegisterUser } from '../models';

interface IError {
  code: string;
  message: string;
  type: string;
}

export const loginWithCredentials = createAction(
  '[Auth] Login With Credentials',
  props<{ credentials: ICredentials }>()
);

export const loginWithCredentialsSuccess = createAction(
  '[Auth] Login With Credentials Success'
);

export const loginWithCredentialsFailure = createAction(
  '[Auth] Login With Credentials Failure',
  props<{ error: IError }>()
);

export const loginWithGoogle = createAction('[Auth] Login With Google');

export const loginWithGoogleSuccess = createAction(
  '[Auth] Login With Google Success'
);

export const loginWithGoogleFailure = createAction(
  '[Auth] Login With Google Failure',
  props<{ error: IError }>()
);
export const loginWithFacebook = createAction('[Auth] Login With Facebook');

export const loginWithFacebookSuccess = createAction(
  '[Auth] Login With Facebook Success'
);

export const loginWithFacebookFailure = createAction(
  '[Auth] Login With Facebook Failure',
  props<{ error: IError }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ user: IRegisterUser }>()
);

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: IError }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const loadUserProfile = createAction('[Auth] Load User Profile');

export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ currentUser: IUser }>()
);

export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: IError }>()
);

export const updateUserProfile = createAction(
  '[Auth] Update User Profile',
  props<{ user: IUpdateUser }>()
);

export const updateUserProfileSuccess = createAction(
  '[Auth] Update User Profile Success',
  props<{ currentUser: IUser }>()
);

export const updateUserProfileFailure = createAction(
  '[Auth] Update User Profile Failure',
  props<{ error: IError }>()
);

export const uploadUserAvatar = createAction(
  '[Auth] Upload User Avatar',
  props<{ file: File }>()
);

export const uploadUserAvatarSuccess = createAction(
  '[Auth] Upload User Avatar Success',
  props<{ currentUser: IUser }>()
);

export const uploadUserAvatarFailure = createAction(
  '[Auth] Upload User Avatar Failure',
  props<{ error: IError }>()
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ email: string; redirectUrl: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: IError }>()
);

export const changePassword = createAction(
  '[Auth] Change Password',
  props<{ oldPassword: string; newPassword: string }>()
);

export const changePasswordSuccess = createAction(
  '[Auth] Change Password Success'
);

export const changePasswordFailure = createAction(
  '[Auth] Change Password Failure',
  props<{ error: IError }>()
);
