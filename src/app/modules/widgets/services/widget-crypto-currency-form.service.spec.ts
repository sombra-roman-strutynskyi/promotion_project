import { TestBed } from '@angular/core/testing';

import { WidgetCryptoCurrencyFormService } from './widget-crypto-currency-form.service';

describe('WidgetCryptoCurrencyFormService', () => {
  let service: WidgetCryptoCurrencyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetCryptoCurrencyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
