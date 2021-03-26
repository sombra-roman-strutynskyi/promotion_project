import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WidgetsApiService } from './widgets-api.service';

describe('WidgetsApiService', () => {
  let service: WidgetsApiService;
  let httpClient: HttpClient;
  let httpGet;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WidgetsApiService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(() => of(null)),
          },
        },
      ],
    });
    service = TestBed.inject(WidgetsApiService);
    httpClient = TestBed.inject(HttpClient);
    httpGet = jest.spyOn(httpClient, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return crypto currency types', () => {
    service.getCryptoCurrencyTypes();
    expect(httpGet).toHaveBeenCalledWith(
      `https://api.coingecko.com/api/v3/coins/list`
    );
  });
  it('should return exchange rates', () => {
    service.getExchangeRates();
    expect(httpGet).toHaveBeenCalledWith(
      `https://api.coingecko.com/api/v3/exchange_rates`
    );
  });
  it('should return crypto currency ', () => {
    service.getCryptoCurrency(['id', 'id2'], 'usd');
    expect(httpGet).toHaveBeenCalledWith(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=id,id2`
    );
  });
});
