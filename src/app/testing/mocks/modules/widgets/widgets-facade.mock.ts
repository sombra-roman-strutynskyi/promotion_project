import { Injectable } from '@angular/core';
import { WidgetsFacade } from '@modules/widgets';
import { of } from 'rxjs';
import {
  MOCK_CRYPTO_CURRENCY_TYPE,
  MOCK_CURRENCY_TYPE,
} from './widgets-data.mock';

@Injectable()
export class WidgetsFacadeMock implements Partial<WidgetsFacade> {
  cryptoCurrencyTypes$ = of([MOCK_CRYPTO_CURRENCY_TYPE]);
  currencyTypes$ = of([MOCK_CURRENCY_TYPE]);
  pending$ = of(null);
  errors$ = of(null);
}
