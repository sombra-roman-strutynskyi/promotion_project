import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Credentials, RegisterUser } from '../models';
import { AuthActions, loginWithCredentials } from '../state/auth.actions';
import { AuthState } from '../state/auth.reducer';
import { authQuery } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  pending$ = this.store.pipe(select(authQuery.getPending));
  userLoaded$ = this.store.pipe(select(authQuery.getUserLoaded));
  isAuthenticated$ = this.store.pipe(select(authQuery.getIsAuthenticated));
  currentUser$ = this.store.pipe(select(authQuery.getUser));
  errors$ = this.store.pipe(select(authQuery.getErrors));

  constructor(private store: Store<AuthState>) {}

  loginWithCredentials(credentials: Credentials) {
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

  logoutConfirmation() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }

  resetPassword(email: string) {
    this.store.dispatch(AuthActions.resetPassword({ email }));
  }

  register(user: RegisterUser) {
    this.store.dispatch(AuthActions.register({ user }));
  }

  loadProfile() {
    this.store.dispatch(AuthActions.loadUserProfile());
  }

  setErrors(errors = []) {
    this.store.dispatch(AuthActions.setErrors({ errors }));
  }
}
