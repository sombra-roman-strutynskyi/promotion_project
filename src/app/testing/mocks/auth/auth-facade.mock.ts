import { Injectable } from '@angular/core';
import { AuthFacade } from '@auth';
import { of } from 'rxjs';
import { MOCK_USER } from './auth-data.mock';

@Injectable()
export class AuthFacadeMock implements Partial<AuthFacade> {
  pending$ = of(null);
  providers$ = of({ password: true, google: true, facebook: true });
  currentUser$ = of(MOCK_USER);
  error$ = of(null);

  loginWithCredentials = jest.fn();
  loginWithGoogle = jest.fn();
  loginWithFacebook = jest.fn();
  logout = jest.fn();
  logoutSuccess = jest.fn();
  forgotPassword = jest.fn();
  register = jest.fn();
  loadProfile = jest.fn();
  resetPassword = jest.fn();
}
