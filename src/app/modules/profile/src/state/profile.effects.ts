import { Injectable } from '@angular/core';
import { AuthFacade } from '@auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarService, IFirebaseError } from '@shared';
import { of } from 'rxjs';
import { catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { ProfileDbService } from '../services';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileDbService: ProfileDbService,
    private authFacade: AuthFacade,
    private snackBar: SnackbarService
  ) {}

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateUserProfile),
      exhaustMap(({ profile }) =>
        this.profileDbService.updateProfile(profile).pipe(
          map(() => ProfileActions.updateUserProfileSuccess()),
          tap(() => this.authFacade.loadProfile()),
          catchError((error) =>
            of(ProfileActions.updateUserProfileFailure(error))
          )
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.changePassword),
      exhaustMap(({ oldPassword, newPassword }) =>
        this.profileDbService.changePassword(oldPassword, newPassword).pipe(
          map(() => ProfileActions.changePasswordSuccess()),
          catchError((error) => of(ProfileActions.changePasswordFailure(error)))
        )
      )
    )
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProfileActions.updateUserProfileFailure,
          ProfileActions.changePasswordFailure
        ),
        tap(({ error }) => {
          const { message } = error;
          if (message) {
            this.snackBar.open(message);
          }
        })
      ),
    { dispatch: false }
  );
}
