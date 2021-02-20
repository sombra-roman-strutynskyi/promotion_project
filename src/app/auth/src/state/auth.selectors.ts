import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from '../models';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const getPending = createSelector(
  getAuthState,
  (state: AuthState) => state.pending
);

const getUser = createSelector(getAuthState, (state: AuthState) =>
  state.userLoaded ? state.user : ({} as IUser)
);

const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

const getProviders = createSelector(
  getAuthState,
  (state: AuthState) => state.providers
);

export const authQuery = {
  getPending,
  getUser,
  getProviders,
  getError,
};
