import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Credentials, IUser, RegisterUser } from '../models';
import * as AuthActions from '../state/auth.actions';
import { AuthState } from '../state/auth.reducer';
import { authQuery } from '../state/auth.selectors';
import { changePassword, uploadUserAvatar } from '../state/auth.actions';

@Injectable()
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

  logoutSuccess() {
    this.store.dispatch(AuthActions.logoutSuccess());
  }

  resetPassword(email: string, redirectUrl: string) {
    this.store.dispatch(AuthActions.resetPassword({ email, redirectUrl }));
  }

  changePassword({ oldPassword, newPassword }) {
    this.store.dispatch(
      AuthActions.changePassword({ oldPassword, newPassword })
    );
  }

  register(user: RegisterUser) {
    this.store.dispatch(AuthActions.register({ user }));
  }

  loadProfile() {
    this.store.dispatch(AuthActions.loadUserProfile());
  }

  updateProfile(user: IUser) {
    this.store.dispatch(AuthActions.updateUserProfile({ user }));
  }
  uploadUserAvatar(file: File) {
    console.log(file);
    
    this.store.dispatch(AuthActions.uploadUserAvatar({ file }));
  }

  setErrors(errors = []) {
    this.store.dispatch(AuthActions.setErrors({ errors }));
  }
}
