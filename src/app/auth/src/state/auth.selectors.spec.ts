import {ApiErrorFields} from '@pentegra/core';
import {mockRequestAccountUserInfo, mockUserProfile} from '@pentegra/testing';
import {AuthState, initialState} from './auth.reducer';
import {authQuery} from './auth.selectors';

describe('Auth Selectors', () => {
  const ERROR_MSG = ['No Error Available'];
  const ERROR_FIELDS: ApiErrorFields[] = [
    {
      field: 'key',
      message: 'some message',
    },
  ];
  const SUCCESS_MSG = ['Success!'];
  let state: AuthState;

  beforeEach(() => {
    state = {
      ...initialState,
      errors: [...ERROR_MSG],
      pending: true,
      isAuthenticated: true,
      errorFields: [...ERROR_FIELDS],
      messages: [...SUCCESS_MSG],
      user: mockUserProfile,
      requestAccountUserInfo: {...mockRequestAccountUserInfo},
      registrationCompleteEmail: mockUserProfile.email,
      emailToken: null,
    };
  });

  it('getIsAuthenticated() should return "true" if user is authorized', () => {
    const results = authQuery.getIsAuthenticated.projector(state);

    expect(results).toBe(true);
  });

  it('getTokenChecked() should return "false" if token is not valid', () => {
    const results = authQuery.getTokenChecked.projector(state);

    expect(results).toBe(false);
  });

  it('getPending() should return "true"', () => {
    const results = authQuery.getPending.projector(state);

    expect(results).toBe(true);
  });

  describe('getUser', () => {
    it('getAuthState() should return information about user if user was loaded', () => {
      const _state = {
        ...state,
        userLoaded: true,
      };
      const results = authQuery.getUser.projector(_state);

      expect(results).toEqual(mockUserProfile);
    });

    it('getAuthState() should return "{}" user if user was not loaded', () => {
      const results = authQuery.getUser.projector(state);

      expect(results).toEqual({});
    });
  });

  it('getUserLoaded() should return "false" if user was not loaded', () => {
    const results = authQuery.getUserLoaded.projector(state);

    expect(results).toBe(false);
  });

  it('getErrors() should return list of error messages', () => {
    const results = authQuery.getErrors.projector(state);

    expect(results).toEqual(ERROR_MSG);
  });

  it('getErrors() should return list of error fields', () => {
    const results = authQuery.getErrorsFields.projector(state);

    expect(results).toEqual(ERROR_FIELDS);
  });

  it('getMessages() should return list of messages', () => {
    const results = authQuery.getMessages.projector(state);

    expect(results).toEqual(SUCCESS_MSG);
  });

  it('getRequestPasswordReset() should return "false"', () => {
    const results = authQuery.getRequestPasswordReset.projector(state);

    expect(results).toBe(false);
  });

  describe('getPrivilege', () => {
    it('getPrivilege() should return list of privileges if user was loaded', () => {
      const results = authQuery.getPrivilege.projector(true, mockUserProfile);

      expect(results).toEqual(mockUserProfile.privilege);
    });

    it('getPrivilege() should return empty list privileges if user was not loaded', () => {
      const results = authQuery.getPrivilege.projector(false, mockUserProfile);

      expect(results).toEqual([]);
    });
  });

  it('getRole() should return user role', () => {
    const results = authQuery.getRole.projector(mockUserProfile);

    expect(results).toBe(mockUserProfile.role.toUpperCase());
  });

  it('getRequestAccountUserInfo() should return user information', () => {
    const results = authQuery.getRequestAccountUserInfo.projector(state);

    expect(results).toEqual(mockRequestAccountUserInfo);
  });

  it('getRegistrationCompleteEmail() should return email', () => {
    const results = authQuery.getRegistrationCompleteEmail.projector(state);

    expect(results).toBe(mockUserProfile.email);
  });

  it('getEmailToken() should return email token', () => {
    const results = authQuery.getEmailToken.projector(state);

    expect(results).toBe(null);
  });
});
