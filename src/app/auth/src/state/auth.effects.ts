import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTES_DATA, SnackbarService } from '@shared';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap, exhaustMap } from 'rxjs/operators';
import { IUser } from '../models';
import { AuthService } from '../services';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackbarService
  ) {}

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      exhaustMap(() =>
        this.authService.googleLogin().pipe(
          map(() => AuthActions.loginWithGoogleSuccess()),
          catchError((error) => of(AuthActions.loginWithGoogleFailure(error)))
        )
      )
    )
  );

  facebookLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithFacebook),
      exhaustMap(() =>
        this.authService.facebookLogin().pipe(
          map(() => AuthActions.loginWithFacebookSuccess()),
          catchError((error) => of(AuthActions.loginWithFacebookFailure(error)))
        )
      )
    )
  );

  loginWithCredentials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithCredentials),
      map(({ credentials }) => ({
        ...credentials,
        remember: credentials?.remember || false,
      })),
      exhaustMap((credentials) =>
        this.authService.loginWithCredentials(credentials).pipe(
          map(() => AuthActions.loginWithCredentialsSuccess()),
          catchError((error) =>
            of(AuthActions.loginWithCredentialsFailure(error))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ user }) =>
        this.authService.register(user).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError((error) =>
            of(AuthActions.loginWithCredentialsFailure(error))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() => this.authService.logout()),
      map(() => AuthActions.logoutSuccess())
    )
  );

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfile),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map(({ currentUser, providerType }) =>
            AuthActions.loadUserProfileSuccess({ currentUser, providerType })
          ),
          catchError((error) => of(AuthActions.loadUserProfileFailure(error)))
        )
      )
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserProfile),
      exhaustMap(({ user }) =>
        this.authService.updateUser(user).pipe(
          map((currentUser: IUser) =>
            AuthActions.updateUserProfileSuccess({ currentUser })
          ),
          catchError((error) => of(AuthActions.updateUserProfileFailure(error)))
        )
      )
    )
  );

  uploadUserAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.uploadUserAvatar),
      exhaustMap(({ file }) =>
        this.authService.uploadUserAvatar(file).pipe(
          map((currentUser: IUser) =>
            AuthActions.uploadUserAvatarSuccess({ currentUser })
          ),
          catchError((error) => of(AuthActions.uploadUserAvatarFailure(error)))
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      exhaustMap(({ oldPassword, newPassword }) =>
        this.authService.changePassword(oldPassword, newPassword).pipe(
          map(() => AuthActions.changePasswordSuccess()),
          catchError((error) => of(AuthActions.changePasswordFailure(error)))
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      exhaustMap(({ email }) =>
        this.authService.passwordForgotten(email).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error) => of(AuthActions.forgotPasswordFailure(error)))
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap(({ actionCode, newPassword, email }) =>
        this.authService.resetPassword(actionCode, newPassword, email).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((error) => of(AuthActions.resetPasswordFailure(error)))
        )
      )
    )
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.loginWithGoogleSuccess,
        AuthActions.loginWithFacebookSuccess,
        AuthActions.loginWithCredentialsSuccess,
        AuthActions.registerSuccess,
        AuthActions.resetPasswordSuccess
      ),
      map(() => AuthActions.loadUserProfile()),
      tap(() => {
        this.router.navigateByUrl(ROUTES_DATA.DASHBOARD.url);
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigateByUrl(ROUTES_DATA.AUTH.children.SIGN_IN.url);
        })
      ),
    { dispatch: false }
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...this.getFailureActions()),
        tap((error) => {
          this.snackBar.open(error.message);
        })
      ),
    { dispatch: false }
  );

  private getFailureActions() {
    return Object.keys(AuthActions).reduce((actions, action) => {
      if (action.toLowerCase().endsWith('failure')) {
        actions.push(AuthActions[action]);
      }
      return actions;
    }, []);
  }
}
