import { WidgetCryptoCurrencyFormService } from './widget-crypto-currency-form.service';
import { WidgetLocalStorageConfigService } from './widget-local-storage-config.service';
import { WidgetsApiService } from './widgets-api.service';
import { WidgetsFacade } from './widgets.facade';

export const SERVICES = [
  WidgetsApiService,
  WidgetsFacade,
  WidgetCryptoCurrencyFormService,
  WidgetLocalStorageConfigService,
];

export * from './widget-crypto-currency-form.service';
export * from './widget-local-storage-config.service';
export * from './widgets-api.service';
export * from './widgets.facade';
