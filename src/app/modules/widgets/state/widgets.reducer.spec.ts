import { Action } from '@ngrx/store';
import { MOCK_CRYPTO_CURRENCY_TYPE, MOCK_CURRENCY_TYPE } from '@testing';
import * as WidgetsActions from './widgets.actions';
import { WidgetsState, initialState, reducer } from './widgets.reducer';

describe('Widgets Reducer', () => {
  describe('valid Widgets actions', () => {
    it('should return the default state', () => {
      const action = {} as Action;

      const state: WidgetsState = reducer(undefined, action);

      expect(state).toBe(initialState);
    });

    it('should reset error in state and start pending', () => {
      const actions = [
        WidgetsActions.loadCryptoCurrencyTypes,
        WidgetsActions.loadCurrencyTypes,
      ];

      actions.forEach((action) => {
        const state: WidgetsState = reducer(initialState, action as Action);

        expect(state.error).toEqual(null);
        expect(state.pending).toBe(true);
      });
    });

    it('should set currencyTypes, reset error and pending in state', () => {
      const action = WidgetsActions.loadCurrencyTypesSuccess({
        currencyTypes: [MOCK_CURRENCY_TYPE],
      });

      const state: WidgetsState = reducer(
        initialState,

        action as Action
      );

      expect(state.currencyTypes.length).toEqual(1);
      expect(state.error).toEqual(null);
      expect(state.pending).toBe(false);
    });

    it('should set cryptoCurrencyTypes, reset error and pending in state', () => {
      const action = WidgetsActions.loadCryptoCurrencyTypesSuccess({
        cryptoCurrencyTypes: [MOCK_CRYPTO_CURRENCY_TYPE],
      });

      const state: WidgetsState = reducer(
        initialState,

        action as Action
      );

      expect(state.cryptoCurrencyTypes.length).toEqual(1);
      expect(state.error).toEqual(null);
      expect(state.pending).toBe(false);
    });

    it('should set error message in state when actions failure triggered', () => {
      const ERROR_MSG = 'No Error Available';

      const actions = [
        WidgetsActions.loadCryptoCurrencyTypesFailure,
        WidgetsActions.loadCurrencyTypesFailure,
      ];

      actions.forEach((action) => {
        const state: WidgetsState = reducer(
          initialState,
          action({ error: ERROR_MSG }) as Action
        );

        expect(state.pending).toBe(false);
        expect(state.error).toEqual(ERROR_MSG);
      });
    });
  });
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
