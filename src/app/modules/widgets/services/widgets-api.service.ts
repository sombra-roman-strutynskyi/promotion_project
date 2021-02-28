import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICryptoCurrency, ICryptoCurrencyType, ICurrencyType } from '../models';

interface IExchangeRates {
  rates: {
    [key: string]: {
      name: string;
      unit: string;
      value: number;
      type: string;
    };
  };
}

@Injectable()
export class WidgetsApiService {
  private apiUrl = `https://api.coingecko.com/api/v3`;
  constructor(private http: HttpClient) {}

  public getCryptoCurrencyTypes(): Observable<ICryptoCurrencyType[]> {
    return this.http.get(`${this.apiUrl}/coins/list`) as Observable<
      ICryptoCurrencyType[]
    >;
  }

  public getExchangeRates(): Observable<IExchangeRates> {
    return this.http.get(
      `${this.apiUrl}/exchange_rates`
    ) as Observable<IExchangeRates>;
  }

  public getCryptoCurrency(
    cryptoCurrencies: string[],
    convertTo: string
  ): Observable<ICryptoCurrency[]> {
    const cryptoCurrenciesString = cryptoCurrencies.join(',');
    return this.http.get(
      `${this.apiUrl}/coins/markets?vs_currency=${convertTo}&ids=${cryptoCurrenciesString}`
    ) as Observable<ICryptoCurrency[]>;
  }
}
