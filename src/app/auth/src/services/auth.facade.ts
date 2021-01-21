import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICredentials, IRegisterUser, IUpdateUser } from '../models';
import * as AuthActions from '../state/auth.actions';
import { AuthState } from '../state/auth.reducer';
import { authQuery } from '../state/auth.selectors';

@Injectable()
export class AuthFacade {
  pending$ = this.store.pipe(select(authQuery.getPending));
  userLoaded$ = this.store.pipe(select(authQuery.getUserLoaded));
  isAuthenticated$ = this.store.pipe(select(authQuery.getIsAuthenticated));
  currentUser$ = this.store.pipe(select(authQuery.getUser));
  errors$ = this.store.pipe(select(authQuery.getError));

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

  resetPassword(email: string, redirectUrl: string) {
    this.store.dispatch(AuthActions.resetPassword({ email, redirectUrl }));
  }

  changePassword({ oldPassword, newPassword }) {
    this.store.dispatch(
      AuthActions.changePassword({ oldPassword, newPassword })
    );
  }

  register(user: IRegisterUser) {
    this.store.dispatch(AuthActions.register({ user }));
  }

  loadProfile() {
    this.store.dispatch(AuthActions.loadUserProfile());
  }

  updateProfile(user: IUpdateUser) {
    this.store.dispatch(AuthActions.updateUserProfile({ user }));
  }
  uploadUserAvatar(file: File) {
    console.log(file);

    this.store.dispatch(AuthActions.uploadUserAvatar({ file }));
  }
}
