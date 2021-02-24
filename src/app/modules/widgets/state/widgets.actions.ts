import { createAction, props } from '@ngrx/store';
import { ICryptoCurrencyType, ICurrencyType } from '../models';

export const getTypes = createAction('[Widgets] Get Types');
export const loadCryptoCurrencyTypes = createAction(
  '[Widgets] Load Crypto Currency Types'
);

export const loadCryptoCurrencyTypesSuccess = createAction(
  '[Widgets] Load Crypto Currency Types Success',
  props<{ cryptoCurrencyTypes: ICryptoCurrencyType[] }>()
);

export const loadCryptoCurrencyTypesFailure = createAction(
  '[Widgets] Load Crypto Currency Types Failure',
  props<{ error: string }>()
);

export const loadCurrencyTypes = createAction('[Widgets] Load Currency Types');

export const loadCurrencyTypesSuccess = createAction(
  '[Widgets] Load Currency Types Success',
  props<{ currencyTypes: ICurrencyType[] }>()
);

export const loadCurrencyTypesFailure = createAction(
  '[Widgets] Load Currency Types Failure',
  props<{ error: string }>()
);
