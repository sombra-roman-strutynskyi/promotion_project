import {
  ICryptoCurrencyType,
  ICryptoCurrency,
  ICurrencyType,
  ICryptoCurrencyWidget,
} from '@modules/widgets';
export const MOCK_CRYPTO_CURRENCY_TYPE: ICryptoCurrencyType = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
};
export const MOCK_CURRENCY_TYPE: ICurrencyType = {
  id: 'usd',
  name: 'US Dollar',
  type: 'fiat',
  unit: '$',
  value: 50000,
};
export const MOCK_CRYPTO_CURRENCY: ICryptoCurrency = {
  current_price: 50000,
  id: 'bitcoin',
  image:
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  name: 'Bitcoin',
  symbol: 'btc',
};

export const MOCK_CRYPTO_CURRENCY_WITH_PRICE: ICryptoCurrency = {
  current_price: 50000,
  id: 'bitcoin',
  image:
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  name: 'Bitcoin',
  symbol: 'btc',
  price: '$ 50,000',
};

export const MOCK_WIDGET_CONFIG: ICryptoCurrencyWidget = {
  cryptoCurrencies: ['bitcoin'],
  convertTo: 'usd',
};
