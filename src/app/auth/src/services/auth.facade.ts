import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Credentials } from '../models/user';
import { AuthActions } from '../state/auth.actions';
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

  login(credentials: Credentials) {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  logoutConfirmation() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }

  resetPassword(data?: any) {
    this.store.dispatch(AuthActions.resetPassword({ credentials: data }));
  }

  loadProfile() {
    this.store.dispatch(AuthActions.loadUserProfile());
  }

  setErrors(errors = []) {
    this.store.dispatch(AuthActions.setErrors({ errors }));
  }
}
