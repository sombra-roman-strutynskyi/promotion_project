import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  ROUTES_DATA,
  SnackbarService,
  getAllFailureActions,
  DialogSuccessBlockComponent,
} from '@shared';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../services';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackbarService,
    private dialog: MatDialog
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
          map(() =>
            AuthActions.registerSuccess({
              successText: `Verification Email Sent To ${user.email}`,
              redirectTo: ROUTES_DATA.ARTICLES.url,
            })
          ),
          catchError((error) => of(AuthActions.registerFailure(error)))
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
            AuthActions.loadUserProfileSuccess({
              currentUser,
              providerType,
            })
          ),
          catchError((error) => of(AuthActions.loadUserProfileFailure(error)))
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      exhaustMap(({ email }) =>
        this.authService.passwordForgotten(email).pipe(
          map(() =>
            AuthActions.forgotPasswordSuccess({
              successText: `Password Reset Email Sent To ${email}`,
              redirectTo: ROUTES_DATA.AUTH.children.SIGN_IN.url,
            })
          ),
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
        AuthActions.resetPasswordSuccess
      ),
      map(() => AuthActions.loadUserProfile()),
      tap(() => {
        this.router.navigateByUrl(ROUTES_DATA.ARTICLES.url);
      })
    )
  );

  sentEmailVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess, AuthActions.forgotPasswordSuccess),
      tap(({ successText, redirectTo }) => {
        this.dialog.open(DialogSuccessBlockComponent, {
          maxWidth: '500px',
          minWidth: '300px',
          data: { text: successText },
        });
        this.router.navigateByUrl(redirectTo);
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

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...getAllFailureActions(AuthActions)),
        tap((error) => {
          const { message = null } = error;
          if (message) {
            this.snackBar.open(message);
          }
        })
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return { type: '[Auth] Load User Profile' };
  }
}
