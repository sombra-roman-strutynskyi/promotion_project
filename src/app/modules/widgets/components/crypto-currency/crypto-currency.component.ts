import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SubscriptionDisposer, UiFormButton } from '@shared';
import { isNil } from 'lodash';
import { timer, BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, map } from 'rxjs/operators';
import {
  ICryptoCurrencyWidget,
  ICryptoCurrency,
  ICurrencyType,
} from '../../models';
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
  implements OnInit, OnDestroy {
  private cryptoCurrencies$ = new BehaviorSubject<ICryptoCurrency[]>(null);
  loadWidgetSubject = new Subject();
  pending$ = this.widgetsFacade.pending$;
  timeout = 1000;
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: true,
    },
  };
  formButtons: UiFormButton[];
  model = {} as ICryptoCurrencyWidget;
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
    this.initForm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.stopLoadingWidgetData();
  }

  public getDataWidget(): Observable<ICryptoCurrency[]> {
    return this.cryptoCurrencies$.asObservable();
  }

  public setWidgetConfig(config: ICryptoCurrencyWidget): void {
    this.widgetConfig = { ...config };
    this.widgetDataConfig.setCryptoCurrencyConfig(config);
    this.restartLoadingWidgetData();
  }

  public onCancel(): void {
    this.model = { ...this.widgetConfig };
    this.toggleFormStateDisabled(true);
  }

  public enableForm(): void {
    this.toggleFormStateDisabled(false);
  }

  private toggleFormStateDisabled(disabled: boolean) {
    this.formOptions.formState.disabled = disabled;
  }

  private loadCurrencies(): void {
    this.widgetsFacade.currencyTypes$
      .pipe(
        filter((d) => !isNil(d)),
        take(1)
      )
      .subscribe((currencies) => {
        this.currencies = currencies;
      });
  }

  private initForm(): void {
    this.fields = this.formService.getFormFields();
    this.formButtons = this.formService.getFormButtons();
  }

  private loadWidgetConfig(): void {
    this.widgetDataConfig
      .getCryptoCurrencyConfig()
      .pipe(takeUntil(this.ngSubject))
      .subscribe((config: ICryptoCurrencyWidget) => {
        this.model = { ...config };
        this.widgetConfig = { ...config };
        if (!this.formOptions.formState.disabled) {
          this.toggleFormStateDisabled(true);
        }
      });
  }

  private loadWidgetData(): void {
    timer(this.timeout)
      .pipe(take(1), takeUntil(this.loadWidgetSubject))
      .subscribe(() => {
        this.timeout = this.widgetConfig ? 5000 : 100;
        if (this.widgetConfig) {
          this.loadCryptoCurrencies();
        }
        this.loadWidgetData();
      });
  }

  private loadCryptoCurrencies(): void {
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

  private stopLoadingWidgetData(): void {
    this.loadWidgetSubject.next();
    this.loadWidgetSubject.complete();
  }

  private restartLoadingWidgetData(): void {
    this.stopLoadingWidgetData();
    this.loadWidgetSubject = new Subject();
    this.timeout = 0;
    this.loadWidgetData();
  }
}
