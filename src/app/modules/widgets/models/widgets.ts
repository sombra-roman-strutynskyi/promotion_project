export interface ICryptoCurrency {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price?: string;
  symbol: string;
}

export interface ICryptoCurrencyType {
  id: string;
  name: string;
  symbol: string;
}

export interface ICurrencyType {
  id: string;
  name: string;
  unit: string;
  value: number;
  type: string;
}

export interface ICryptoCurrencyWidget {
  cryptoCurrencies: string[];
  convertTo: string;
}

export interface IWidgetsConfig {
  cryptoCurrencyWidget: ICryptoCurrencyWidget;
}

export const defaultWidgetsConfig = {
  cryptoCurrencyWidget: {
    cryptoCurrencies: ['bitcoin'],
    convertTo: 'usd',
  },
};
