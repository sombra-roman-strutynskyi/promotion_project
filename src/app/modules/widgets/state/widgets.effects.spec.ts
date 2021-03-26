import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
export { cold, hot } from 'jasmine-marbles';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@auth';
import { SnackbarService } from '@shared';
import {
  AuthFacadeMock,
  MockStoreModule,
  WidgetsFacadeMock,
  RouterMock,
  MOCK_CRYPTO_CURRENCY,
  MOCK_CURRENCY_TYPE,
} from '@testing';
import { cold, hot } from 'jasmine-marbles';
import { WidgetsApiService, WidgetsFacade } from '../services';
import { initialState, WIDGETS_FEATURE_KEY } from '../state/widgets.reducer';
import * as WidgetsActions from './widgets.actions';
import { WidgetsEffects } from './widgets.effects';

describe('WidgetsEffects', () => {
  let store: Store<any>;
  let effects: WidgetsEffects;
  let authFacade: AuthFacade;
  let widgetsApiService: WidgetsApiService;
  let actions$: Observable<any>;
  let routerService: Partial<Router>;
  let dialog: MatDialog;
  let snackBar: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockStoreModule.forRoot(WIDGETS_FEATURE_KEY, { initialState })],
      providers: [
        WidgetsEffects,
        provideMockActions(() => actions$),
        { provide: AuthFacade, useClass: AuthFacadeMock },
        { provide: WidgetsFacade, useClass: WidgetsFacadeMock },
        {
          provide: WidgetsApiService,
          useValue: {},
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: SnackbarService,
          useValue: { open: jest.fn() },
        },
        {
          provide: MatDialog,
          useValue: { open: jest.fn() },
        },
      ],
    });

    store = TestBed.inject(Store);
    effects = TestBed.inject(WidgetsEffects);
    authFacade = TestBed.inject(AuthFacade);
    actions$ = TestBed.inject(Actions);
    routerService = TestBed.inject(Router);
    widgetsApiService = TestBed.inject(WidgetsApiService);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(SnackbarService);
  });

  describe('loadCryptoCurrencyTypes$', () => {
    beforeEach(() => {
      const action = WidgetsActions.loadCryptoCurrencyTypes();

      actions$ = hot('-a', { a: action });
    });
    it('should return an WidgetsActions.loadCryptoCurrencyTypesSuccess action, when widgetsDb succeeds', () => {
      const cryptoCurrencyTypes = [MOCK_CRYPTO_CURRENCY];

      const completion = WidgetsActions.loadCryptoCurrencyTypesSuccess({
        cryptoCurrencyTypes,
      });

      const response = cold('-a|', {
        a: cryptoCurrencyTypes,
      });
      const expected = cold('--c', { c: completion });

      widgetsApiService.getCryptoCurrencyTypes = jest.fn(() => response);
      expect(effects.loadCryptoCurrencyTypes$).toBeObservable(expected);
    });

    it('should return a new  WidgetsActions.loadCryptoCurrencyTypesFailure if the widgetsDb service throws error', () => {
      const error = { error: 'error' };
      const completion = WidgetsActions.loadCryptoCurrencyTypesFailure({
        error: 'error',
      });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      widgetsApiService.getCryptoCurrencyTypes = jest.fn(() => response);
      expect(effects.loadCryptoCurrencyTypes$).toBeObservable(expected);
    });
  });

  describe('loadCurrencyTypes$', () => {
    beforeEach(() => {
      const action = WidgetsActions.loadCurrencyTypes();

      actions$ = hot('-a', { a: action });
    });
    it('should return an WidgetsActions.loadCurrencyTypesSuccess action, when widgetsDb succeeds', () => {
      const currencyTypes = [MOCK_CURRENCY_TYPE];

      const completion = WidgetsActions.loadCurrencyTypesSuccess({
        currencyTypes,
      });

      const response = cold('-a|', {
        a: {
          rates: {
            [MOCK_CURRENCY_TYPE.id]: MOCK_CURRENCY_TYPE,
          },
        },
      });
      const expected = cold('--c', { c: completion });

      widgetsApiService.getExchangeRates = jest.fn(() => response);
      expect(effects.loadCurrencyTypes$).toBeObservable(expected);
    });

    it('should return a new  WidgetsActions.loadCurrencyTypesFailure if the widgetsDb service throws error', () => {
      const error = { error: 'error' };
      const completion = WidgetsActions.loadCurrencyTypesFailure({
        error: 'error',
      });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      widgetsApiService.getExchangeRates = jest.fn(() => response);
      expect(effects.loadCurrencyTypes$).toBeObservable(expected);
    });
  });

  describe('getTypes$', () => {
    it('should return an WidgetsActions. action, when widgetsDb succeeds', (done) => {
      let i = 0;
      const completion = [
        WidgetsActions.loadCurrencyTypes(),
        WidgetsActions.loadCryptoCurrencyTypes(),
      ];

      actions$ = actions$ = of(WidgetsActions.getTypes());

      effects.getTypes$.subscribe((actions) => {
        expect(actions).toEqual(completion[i]);
        i++;
        done();
      });
    });
  });
  describe('handleError$', () => {
    let snackbarOpen;
    beforeEach(() => {
      snackbarOpen = jest.spyOn(snackBar, 'open');
    });
    it(`should call SnackbarOpen when is dispatched action from list:
        WidgetsActions.loadCurrencyTypesFailure,
        WidgetsActions.loadCryptoCurrencyTypesFailure.
      `, (done: any) => {
      const error = 'error';
      actions$ = of(
        WidgetsActions.loadCurrencyTypesFailure({ error }),
        WidgetsActions.loadCryptoCurrencyTypesFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledWith(error);
        done();
      });
    });
    it(`should not call SnackbarOpen when is dispatched action without message from list:
        WidgetsActions.loadCurrencyTypesFailure,
        WidgetsActions.loadCryptoCurrencyTypesFailure.
      `, (done: any) => {
      const error = null;
      actions$ = of(
        WidgetsActions.loadCurrencyTypesFailure({ error }),
        WidgetsActions.loadCryptoCurrencyTypesFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
