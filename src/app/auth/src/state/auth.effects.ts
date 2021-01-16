import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTES_DATA } from '@shared';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { IUser } from '../models';
import { AuthService } from '../services';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      switchMap(() =>
        this.authService.googleLogin().pipe(
          map(() => AuthActions.loginWithGoogleSuccess()),
          catchError((errors) => of(AuthActions.loginWithGoogleFailure(errors)))
        )
      )
    )
  );

  facebookLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithFacebook),
      switchMap(() =>
        this.authService.facebookLogin().pipe(
          map(() => AuthActions.loginWithFacebook()),
          catchError((errors) =>
            of(AuthActions.loginWithFacebookFailure(errors))
          )
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
      switchMap((credentials) =>
        this.authService.loginWithCredentials(credentials).pipe(
          map(() => AuthActions.loginWithCredentialsSuccess()),
          catchError((errors) =>
            of(AuthActions.loginWithCredentialsFailure(errors))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ user }) =>
        this.authService.register(user).pipe(
          map(() => AuthActions.loadUserProfile()),
          catchError((errors) =>
            of(AuthActions.loginWithCredentialsFailure(errors))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => this.authService.logout()),
      map(() => AuthActions.logoutSuccess())
    )
  );

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfile),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((currentUser: IUser) =>
            AuthActions.loadUserProfileSuccess({ currentUser })
          ),
          catchError((errors) => of(AuthActions.loadUserProfileFailure(errors)))
        )
      )
    )
  );
  
  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserProfile),
      switchMap(({ user }) =>
        this.authService.updateUser(user).pipe(
          map((currentUser: IUser) =>
            AuthActions.updateUserProfileSuccess({ currentUser })
          ),
          catchError((errors) =>
            of(AuthActions.updateUserProfileFailure(errors))
          )
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      switchMap(({ oldPassword, newPassword }) =>
        this.authService.changePassword(oldPassword, newPassword).pipe(
          map(() => AuthActions.changePasswordSuccess()),
          catchError((errors) => of(AuthActions.changePasswordFailure(errors)))
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      switchMap(({ email, redirectUrl }) =>
        this.authService.passwordForgotten(email, redirectUrl).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((errors) => of(AuthActions.resetPasswordFailure(errors)))
        )
      )
    )
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.loginWithGoogleSuccess,
        AuthActions.loginWithFacebookSuccess,
        AuthActions.loginWithCredentialsSuccess
      ),
      tap(() => {
        this.router.navigateByUrl(ROUTES_DATA.DASHBOARD.url);
      }),
      map(() => AuthActions.loadUserProfile())
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
}
