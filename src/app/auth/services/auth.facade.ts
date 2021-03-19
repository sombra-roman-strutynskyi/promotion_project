import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICredentials, IRegisterUser } from '../models';
import * as AuthActions from '../state/auth.actions';
import { AuthState } from '../state/auth.reducer';
import { authQuery } from '../state/auth.selectors';

@Injectable()
export class AuthFacade {
  pending$ = this.store.pipe(select(authQuery.getPending));
  providers$ = this.store.pipe(select(authQuery.getProviders));
  currentUser$ = this.store.pipe(select(authQuery.getUser));
  error$ = this.store.pipe(select(authQuery.getError));

  constructor(private store: Store<AuthState>) {}

  loginWithCredentials(credentials: ICredentials) {
    this.store.dispatch(AuthActions.loginWithCredentials({ credentials }));
  }
  loginWithGoogle() {
    this.store.dispatch(AuthActions.loginWithGoogle());
  }
  loginWithFacebook() {
    this.store.dispatch(AuthActions.loginWithFacebook());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  logoutSuccess() {
    this.store.dispatch(AuthActions.logoutSuccess());
  }

  forgotPassword(email: string) {
    this.store.dispatch(AuthActions.forgotPassword({ email }));
  }

  register(user: IRegisterUser) {
    this.store.dispatch(AuthActions.register({ user }));
  }

  loadProfile() {
    this.store.dispatch(AuthActions.loadUserProfile());
  }

  resetPassword(actionCode: string, newPassword: string, email: string) {
    this.store.dispatch(
      AuthActions.resetPassword({ actionCode, newPassword, email })
    );
  }
}
