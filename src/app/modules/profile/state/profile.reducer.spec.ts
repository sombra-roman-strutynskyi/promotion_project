import { Action } from '@ngrx/store';
import { MOCK_FIREBASE_ERROR } from '@testing';
import * as ProfileActions from './profile.actions';
import { ProfileState, initialState, reducer } from './profile.reducer';

describe('Profile Reducer', () => {
  describe('valid Profile actions', () => {
    it('should return the default state', () => {
      const action = {} as Action;

      const state: ProfileState = reducer(undefined, action);

      expect(state).toBe(initialState);
    });

    it('should reset error in state and start pending', () => {
      const actions = [
        ProfileActions.changePassword,
        ProfileActions.updateUserProfile,
      ];

      actions.forEach((action) => {
        const state: ProfileState = reducer(initialState, action as Action);

        expect(state.error).toEqual(null);
        expect(state.pending).toBe(true);
      });
    });

    it('should reset error in state and end pending', () => {
      const actions = [
        ProfileActions.changePasswordSuccess,
        ProfileActions.updateUserProfileSuccess,
      ];

      actions.forEach((action) => {
        const state: ProfileState = reducer(initialState, action as Action);

        expect(state.error).toEqual(null);
        expect(state.pending).toBe(false);
      });
    });

    it('should set error message in state when actions failure triggered', () => {
      const actions = [
        ProfileActions.updateUserProfileFailure,
        ProfileActions.changePasswordFailure,
      ];

      actions.forEach((action) => {
        const state: ProfileState = reducer(
          initialState,
          action({ error: MOCK_FIREBASE_ERROR }) as Action
        );

        expect(state.pending).toBe(false);
        expect(state.error).toEqual(MOCK_FIREBASE_ERROR.message);
      });
    });
  });
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
