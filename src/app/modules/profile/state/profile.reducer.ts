import { Action, createReducer, on } from '@ngrx/store';
import { IFirebaseError } from '@shared';
import * as ProfileActions from './profile.actions';

export const PROFILE_FEATURE_KEY = 'profile';
export interface ProfileState {
  pending: boolean;
  error: string;
}

export const initialState: ProfileState = {
  pending: false,
  error: null,
};

const profileReducer = createReducer(
  initialState,
  on(
    ProfileActions.changePassword,
    ProfileActions.updateUserProfile,

    (state) => ({
      ...state,
      error: null,
      pending: true,
    })
  ),
  on(
    ProfileActions.changePasswordSuccess,
    ProfileActions.updateUserProfileSuccess,
    (state) => ({
      ...state,
      error: null,
      pending: false,
    })
  ),
  on(
    ProfileActions.updateUserProfileFailure,
    ProfileActions.changePasswordFailure,
    (state, { error }: { error: IFirebaseError }) => ({
      ...state,
      error: error?.message ?? null,
      pending: false,
    })
  )
);

export function reducer(state: ProfileState | undefined, action: Action) {
  return profileReducer(state, action);
}
