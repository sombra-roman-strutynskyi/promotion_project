import { Injectable } from '@angular/core';
import { mockUserInfo } from './auth-data.mock';
import { of } from 'rxjs';
import { AuthFacade } from '@auth';

@Injectable()
export class AuthFacadeMock implements Partial<AuthFacade> {
  pending$ = of(null);
  providers$ = of(null);
  currentUser$ = of(mockUserInfo);
  errors$ = of(null);

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
