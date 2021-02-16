import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { isNullOrUndefined, SubscriptionDisposer, UiFormButton } from '@shared';
import { timer, BehaviorSubject, Observable } from 'rxjs';
import { filter, take, takeUntil, map } from 'rxjs/operators';
import { ICryptoCurrencyWidget } from '../../models';
import { ICryptoCurrency, ICurrencyType } from '../../models/widgets';
import {
  WidgetCryptoCurrencyFormService,
  WidgetLocalStorageConfigService,
  WidgetsApiService,
  WidgetsFacade,
} from '../../services';

@Component({
  selector: 'widget-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.scss'],
})
export class CryptoCurrencyComponent
  extends SubscriptionDisposer
  implements OnInit {
  timeout = 1000;
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: true,
    },
  };
  formButtons: UiFormButton[] = [
    {
      label: 'Save',
      type: 'submit',
      classWrapper: 'col',
      classNames: 'margin-left-auto ',
      action: { type: 'submit' },
      style: {
        color: 'accent',
        type: 'raised',
      },
    },
    {
      label: 'Cancel',
      type: 'button',
      classWrapper: 'col-auto',
      action: { type: 'cancel' },
      style: {
        color: 'primary',
      },
    },
  ];
  model = {} as ICryptoCurrencyWidget;
  pending$ = this.widgetsFacade.pending$;
  private cryptoCurrencies$ = new BehaviorSubject<ICryptoCurrency[]>(null);
  currencies: ICurrencyType[];
  widgetConfig: ICryptoCurrencyWidget;
  constructor(
    private widgetsFacade: WidgetsFacade,
    private formService: WidgetCryptoCurrencyFormService,
    private widgetDataConfig: WidgetLocalStorageConfigService,
    private widgetApi: WidgetsApiService
  ) {
    super();
  }

  ngOnInit() {
    this.loadWidgetConfig();
    this.loadCurrencies();
    this.loadWidgetData();
    this.fields = this.formService.getFormFields();
  }
  loadWidgetConfig() {
    this.widgetDataConfig
      .getCryptoCurrencyConfig()
      .pipe(takeUntil(this.ngSubject))
      .subscribe((config: ICryptoCurrencyWidget) => {
        this.model = { ...config };
        this.widgetConfig = { ...config };
      });
  }

  loadWidgetData() {
    timer(this.timeout)
      .pipe(take(1))
      .subscribe(() => {
        this.timeout = this.widgetConfig ? 5000 : 100;
        if (this.widgetConfig) {
          this.loadCryptoCurrencies();
        }
        this.loadWidgetData();
      });
  }

  loadCurrencies() {
    this.widgetsFacade.currencyTypes$
      .pipe(
        filter((d) => !isNullOrUndefined(d)),
        take(1)
      )
      .subscribe((currencies) => {
        this.currencies = currencies;
      });
  }

  loadCryptoCurrencies() {
    const { cryptoCurrencies, convertTo } = this.widgetConfig;

    this.widgetApi
      .getCryptoCurrency(cryptoCurrencies, convertTo)
      .pipe(
        take(1),
        map((data: ICryptoCurrency[]) => {
          if (this.currencies && data) {
            const currency = this.currencies.find(({ id }) => id === convertTo);
            return data.map((cryptoCurrency) => ({
              ...cryptoCurrency,
              price: `${
                currency.unit
              } ${cryptoCurrency.current_price.toLocaleString()}`,
            }));
          }
          return [];
        })
      )
      .subscribe((data: ICryptoCurrency[]) => {
        this.cryptoCurrencies$.next(data);
      });
  }

  getDataWidget(): Observable<ICryptoCurrency[]> {
    return this.cryptoCurrencies$.asObservable();
  }

  setWidgetConfig(config: ICryptoCurrencyWidget) {
    this.widgetConfig = { ...config };
    this.widgetDataConfig.setCryptoCurrencyConfig(config);
  }

  onCancel() {
    this.model = { ...this.widgetConfig };
    this.toggleFormStateDisabled(true);
  }

  toggleFormStateDisabled(disabled: boolean) {
    this.formOptions.formState.disabled = disabled;
  }
}
