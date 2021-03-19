import { MOCK_USER } from '@testing';
import { AuthState, initialState } from './auth.reducer';
import { authQuery } from './auth.selectors';

describe('Auth Selectors', () => {
  const ERROR_MSG = 'No Error Available';

  let state: AuthState;

  beforeEach(() => {
    state = {
      ...initialState,
      user: MOCK_USER,
      error: ERROR_MSG,
    };
  });

  it('getPending() should return "false"', () => {
    const results = authQuery.getPending.projector(state);

    expect(results).toBe(false);
  });

  it('getUser() should return information about user if user was loaded', () => {
    const _state = {
      ...state,
      userLoaded: true,
    };
    const results = authQuery.getUser.projector(_state);

    expect(results).toEqual(MOCK_USER);
  });
  it('getUser() should return empty object if user was not loaded', () => {
    const _state = {
      ...state,
      userLoaded: false,
    };
    const results = authQuery.getUser.projector(_state);

    expect(results).toEqual({});
  });

  it('getProviders() should return object with providers equal "false" ', () => {
    const results = authQuery.getProviders.projector(state);
    expect(JSON.stringify(results)).toBe(
      JSON.stringify({ password: false, google: false, facebook: false })
    );
  });

  it('getError() should return error messages', () => {
    const results = authQuery.getError.projector(state);

    expect(results).toEqual(ERROR_MSG);
  });
});
