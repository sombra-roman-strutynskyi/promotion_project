import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const getIsAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => state.isAuthenticated
);

const getPending = createSelector(
  getAuthState,
  (state: AuthState) => state.pending
);

const getUser = createSelector(getAuthState, (state: AuthState) =>
  state.userLoaded ? state.user : ({} as User)
);

const getUserLoaded = createSelector(
  getAuthState,
  (state: AuthState) => state.userLoaded
);

const getErrors = createSelector(
  getAuthState,
  (state: AuthState) => state.errors
);

const getRequestPasswordReset = createSelector(
  getAuthState,
  (state: AuthState) => state.requestPasswordReset
);

export const authQuery = {
  getPending,
  getIsAuthenticated,
  getUser,
  getUserLoaded,
  getErrors,
  getRequestPasswordReset,
};
