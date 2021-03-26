import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SnackbarService } from '@shared';
import { of } from 'rxjs';
import { catchError, map, tap, exhaustMap, flatMap } from 'rxjs/operators';
import { WidgetsApiService } from '../services';
import * as WidgetsActions from './widgets.actions';

@Injectable()
export class WidgetsEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private widgetsApiService: WidgetsApiService,
    private snackBar: SnackbarService
  ) {}

  loadCryptoCurrencyTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.loadCryptoCurrencyTypes),
      exhaustMap(() =>
        this.widgetsApiService.getCryptoCurrencyTypes().pipe(
          map((cryptoCurrencyTypes) =>
            WidgetsActions.loadCryptoCurrencyTypesSuccess({
              cryptoCurrencyTypes,
            })
          ),
          catchError(({ error }) =>
            of(WidgetsActions.loadCryptoCurrencyTypesFailure({ error }))
          )
        )
      )
    )
  );

  loadCurrencyTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.loadCurrencyTypes),
      exhaustMap(() =>
        this.widgetsApiService.getExchangeRates().pipe(
          map(({ rates }) => {
            const currencyTypes = Object.entries(rates || {}).map(
              ([id, data]) => ({
                ...data,
                id,
              })
            );
            return WidgetsActions.loadCurrencyTypesSuccess({ currencyTypes });
          }),
          catchError(({ error }) =>
            of(WidgetsActions.loadCurrencyTypesFailure({ error }))
          )
        )
      )
    )
  );

  getTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.getTypes),
      flatMap(() => [
        WidgetsActions.loadCurrencyTypes(),
        WidgetsActions.loadCryptoCurrencyTypes(),
      ])
    )
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          WidgetsActions.loadCurrencyTypesFailure,
          WidgetsActions.loadCryptoCurrencyTypesFailure
        ),
        tap(({ error }) => {
          if (error) {
            this.snackBar.open(error);
          }
        })
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return { type: '[Widgets] Get Types' };
  }
}
