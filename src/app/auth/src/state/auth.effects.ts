import { Location } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  combineLatest,
  forkJoin,
  from,
  fromEvent,
  merge,
  of,
  timer,
  zip,
} from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  switchMap,
  switchMapTo,
  filter,
  withLatestFrom,
  take,
  zipAll,
} from 'rxjs/operators';
import { Credentials, IUser } from '../models';
import { AuthService } from '../services';
import { AuthFacade } from '../services/auth.facade';
import * as AuthActions from './auth.actions';
import { authQuery } from './auth.selectors';
// const PROVIDERS_MAP = {};
// PROVIDERS_MAP[auth.FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD] = 'facebook';
// PROVIDERS_MAP[auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD] = 'google';
// PROVIDERS_MAP[auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD] = 'password';
// PROVIDERS_MAP[auth.PhoneAuthProvider.PHONE_SIGN_IN_METHOD] = 'phone';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}
  // login$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(AuthActions.login),
  //     map((action) => action.credentials),
  //     switchMap(({ email, password }: Credentials) =>
  //       from(
  //         this.authFirebase.auth.signInWithEmailAndPassword(email, password)
  //       ).pipe(
  //         map((result) => {
  //           return AuthActions.loginSuccess({ result });
  //         })
  //       )
  //     )
  //   )
  // );
  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      exhaustMap(() => {
        console.log('call');

        return this.authService.googleLogin().pipe(
          map(() => AuthActions.loadUserProfile()),
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
          map(() => AuthActions.loadUserProfile()),
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
            map((currentUser: IUser) =>
              AuthActions.loadUserProfileSuccess({ currentUser })
            ),
            catchError((errors) =>
              of(AuthActions.loadUserProfileFailure(errors))
            )
          )
        // }
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
