import { Action, createReducer, on } from '@ngrx/store';
import { ICryptoCurrencyType, ICurrencyType } from '../models';
import * as WidgetsActions from './widgets.actions';

export const WIDGETS_FEATURE_KEY = 'widgets';
export interface WidgetsState {
  cryptoCurrencyTypes: ICryptoCurrencyType[];
  currencyTypes: ICurrencyType[];
  pending: boolean;
  error: string;
}

export const initialState: WidgetsState = {
  cryptoCurrencyTypes: null,
  currencyTypes: null,
  pending: false,
  error: null,
};

const widgetsReducer = createReducer(
  initialState,
  on(
    WidgetsActions.loadCryptoCurrencyTypes,
    WidgetsActions.loadCurrencyTypes,
    (state) => ({
      ...state,
      error: null,
      pending: true,
    })
  ),
  on(
    WidgetsActions.loadCryptoCurrencyTypesSuccess,
    (state, { cryptoCurrencyTypes }) => ({
      ...state,
      cryptoCurrencyTypes,
      error: null,
      pending: false,
    })
  ),
  on(WidgetsActions.loadCurrencyTypesSuccess, (state, { currencyTypes }) => ({
    ...state,
    currencyTypes,
    error: null,
    pending: false,
  })),
  on(
    WidgetsActions.loadCryptoCurrencyTypesFailure,
    WidgetsActions.loadCurrencyTypesFailure,
    (state, { error }) => ({
      ...state,
      error,
      pending: false,
    })
  )
);

export function reducer(state: WidgetsState | undefined, action: Action) {
  return widgetsReducer(state, action);
}
