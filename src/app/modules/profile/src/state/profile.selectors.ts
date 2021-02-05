import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROFILE_FEATURE_KEY, ProfileState } from './profile.reducer';

// Lookup the 'Profile' feature state managed by NgRx
const getProfileState = createFeatureSelector<ProfileState>(
  PROFILE_FEATURE_KEY
);

const getPending = createSelector(
  getProfileState,
  (state: ProfileState) => state.pending
);

const getError = createSelector(
  getProfileState,
  (state: ProfileState) => state.error
);

export const profileQuery = {
  getPending,
  getError,
};
