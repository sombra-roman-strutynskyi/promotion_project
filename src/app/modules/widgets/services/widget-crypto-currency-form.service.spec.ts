import { TestBed } from '@angular/core/testing';
import { MOCK_CURRENCY_TYPE, MOCK_CRYPTO_CURRENCY_TYPE } from '@testing';
import { of } from 'rxjs';
import { WidgetCryptoCurrencyFormService } from './widget-crypto-currency-form.service';
import { WidgetsFacade } from './widgets.facade';

describe('WidgetCryptoCurrencyFormService', () => {
  let service: WidgetCryptoCurrencyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WidgetCryptoCurrencyFormService,
        {
          provide: WidgetsFacade,
          useValue: {
            currencyTypes$: of([MOCK_CURRENCY_TYPE]),
            cryptoCurrencyTypes$: of([MOCK_CRYPTO_CURRENCY_TYPE]),
          },
        },
      ],
    });
    service = TestBed.inject(WidgetCryptoCurrencyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return form buttons', () => {
    expect(service.getFormButtons().length).toEqual(2);
  });
  it('should return form fields', () => {
    expect(service.getFormFields().length).toEqual(2);
  });
});
