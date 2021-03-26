import { MOCK_CRYPTO_CURRENCY_TYPE, MOCK_CURRENCY_TYPE } from '@testing';
import { WidgetsState, initialState } from './widgets.reducer';
import { widgetsQuery } from './widgets.selectors';

describe('Widgets Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  let state: WidgetsState;

  beforeEach(() => {
    state = {
      ...initialState,
      error: ERROR_MSG,
      cryptoCurrencyTypes: [MOCK_CRYPTO_CURRENCY_TYPE],
      currencyTypes: [MOCK_CURRENCY_TYPE],
    };
  });

  it('getPending() should return "false"', () => {
    const results = widgetsQuery.getPending.projector(state);

    expect(results).toBe(false);
  });
  it('getCryptoCurrencyTypes() should length equal "1"', () => {
    const results = widgetsQuery.getCryptoCurrencyTypes.projector(state);

    expect(results.length).toBe(1);
  });
  it('getCurrencyTypes() should length equal "1"', () => {
    const results = widgetsQuery.getCurrencyTypes.projector(state);

    expect(results.length).toBe(1);
  });
  it('getError() should return error messages', () => {
    const results = widgetsQuery.getError.projector(state);

    expect(results).toEqual(ERROR_MSG);
  });
});
