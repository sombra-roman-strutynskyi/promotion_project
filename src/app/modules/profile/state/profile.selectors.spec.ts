import { ProfileState, initialState } from './profile.reducer';
import { profileQuery } from './profile.selectors';

describe('Profile Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  let state: ProfileState;

  beforeEach(() => {
    state = {
      ...initialState,
      error: ERROR_MSG,
    };
  });

  it('getPending() should return "false"', () => {
    const results = profileQuery.getPending.projector(state);

    expect(results).toBe(false);
  });

  it('getError() should return error messages', () => {
    const results = profileQuery.getError.projector(state);

    expect(results).toEqual(ERROR_MSG);
  });
});
