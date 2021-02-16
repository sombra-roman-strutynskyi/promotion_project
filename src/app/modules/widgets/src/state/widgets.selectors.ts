import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WidgetsState, WIDGETS_FEATURE_KEY } from './widgets.reducer';

// Lookup the 'Widgets' feature state managed by NgRx
const getWidgetsState = createFeatureSelector<WidgetsState>(
  WIDGETS_FEATURE_KEY
);

const getPending = createSelector(
  getWidgetsState,
  (state: WidgetsState) => state.pending
);

const getCryptoCurrencyTypes = createSelector(
  getWidgetsState,
  (state: WidgetsState) => state.cryptoCurrencyTypes
);

const getCurrencyTypes = createSelector(
  getWidgetsState,
  (state: WidgetsState) => state.currencyTypes
);

const getError = createSelector(
  getWidgetsState,
  (state: WidgetsState) => state.error
);

export const widgetsQuery = {
  getPending,
  getError,
  getCryptoCurrencyTypes,
  getCurrencyTypes,
};
