import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { IUser } from '../models';
import { AuthService } from '../services';
import * as AuthActions from './auth.actions';
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      exhaustMap(() => {
        console.log('call');

        return this.authService.googleLogin().pipe(
          map((data) => {
            console.log(data);

            return AuthActions.loadUserProfile();
          }),
          catchError((errors) => of(AuthActions.loginWithGoogleFailure(errors)))
        );
      })
    )
  );

  facebookLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithFacebook),
      exhaustMap(() =>
        this.authService.facebookLogin().pipe(
          map(() => {
            return AuthActions.loadUserProfile();
          }),
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
      exhaustMap((credentials) =>
        this.authService.loginWithCredentials(credentials).pipe(
          map(() => AuthActions.loadUserProfile()),
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
      exhaustMap(({ user }) =>
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
      exhaustMap(() => this.authService.logout()),
      map(() => AuthActions.logoutConfirmation())
    )
  );

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfile),
      exhaustMap(
        () =>
          this.authService.getCurrentUser().pipe(
            map((currentUser: IUser) => {
              console.log(currentUser);

              return AuthActions.loadUserProfileSuccess({ currentUser });
            }),
            catchError((errors) =>
              of(AuthActions.loadUserProfileFailure(errors))
            )
          )
        // }
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      exhaustMap(({ oldPassword, newPassword }) =>
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
      exhaustMap(({ email, redirectUrl }) =>
        this.authService.passwordForgotten(email, redirectUrl).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((errors) => of(AuthActions.resetPasswordFailure(errors)))
        )
      )
    )
  );
  //   /**
  //    * @description
  //    * Action to be dispatched after the effect is registered.
  //    */
  // ngrxOnInitEffects(): Action {
  //   return { type: '[Auth] Start ' };
  // }
}
