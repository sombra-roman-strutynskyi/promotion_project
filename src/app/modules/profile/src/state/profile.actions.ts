import { createAction, props } from '@ngrx/store';
import { IUpdateProfile } from '../models';

interface IError {
  code: string;
  message: string;
  type: string;
}

export const updateUserProfile = createAction(
  '[Profile] Update User Profile',
  props<{ profile: IUpdateProfile }>()
);

export const updateUserProfileSuccess = createAction(
  '[Profile] Update User Profile Success'
);

export const updateUserProfileFailure = createAction(
  '[Profile] Update User Profile Failure',
  props<{ error: IError }>()
);

export const changePassword = createAction(
  '[Profile] Change Password',
  props<{ oldPassword: string; newPassword: string }>()
);

export const changePasswordSuccess = createAction(
  '[Profile] Change Password Success'
);

export const changePasswordFailure = createAction(
  '[Profile] Change Password Failure',
  props<{ error: IError }>()
);
