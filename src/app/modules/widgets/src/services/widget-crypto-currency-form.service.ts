import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getOptionsForSelect, isNullOrUndefined, UiFormButton } from '@shared';
import { map, take, filter } from 'rxjs/operators';
import { WidgetsFacade } from './widgets.facade';

@Injectable()
export class WidgetCryptoCurrencyFormService {
  constructor(private widgetFacade: WidgetsFacade) {}

  getFormFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'cryptoCurrencies',
        type: 'select',
        defaultValue: ['bitcoin'],
        templateOptions: {
          label: 'Crypto Currencies',
          required: true,
          multiple: true,
          maxLength: 10,
          options: this.getCryptoCurrenciesOptions(),
        },
        validation: {
          show: true,
          messages: {
            required: () => `Please select Crypto Currencies`,
            maxlength: () => `Max quantity should be 10`,
          },
        },
      },
      {
        key: 'convertTo',
        type: 'select',
        defaultValue: 'usd',
        templateOptions: {
          label: 'Convert To',
          required: true,
          options: this.getCurrenciesOptions(),
        },
        validation: {
          show: true,
          messages: {
            required: () => `Please select Currency`,
          },
        },
      },
    ];
  }

  getFormButtons(): UiFormButton[] {
    return [
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
  }

  private getCryptoCurrenciesOptions() {
    return getOptionsForSelect(
      this.widgetFacade.cryptoCurrencyTypes$.pipe(
        filter((d) => !isNullOrUndefined(d)),
        take(1),
        map((d) => d.slice(200, 2200))
      )
    );
  }
  private getCurrenciesOptions() {
    return getOptionsForSelect(
      this.widgetFacade.currencyTypes$.pipe(
        filter((d) => !isNullOrUndefined(d)),
        take(1)
      )
    );
  }
}
