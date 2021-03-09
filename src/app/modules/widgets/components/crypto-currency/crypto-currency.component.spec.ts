import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ICryptoCurrencyWidget,
  WidgetCryptoCurrencyFormService,
  WidgetLocalStorageConfigService,
  WidgetsApiService,
  WidgetsFacade,
} from '@modules/widgets';
import {
  createComponent,
  MOCK_CRYPTO_CURRENCY,
  MOCK_CRYPTO_CURRENCY_TYPE,
  MOCK_CURRENCY_TYPE,
  MOCK_WIDGET_CONFIG,
  TestingModule,
  WidgetsFacadeMock,
} from '@testing';

import { of } from 'rxjs';
import { CryptoCurrencyComponent } from './crypto-currency.component';
const imports = [TestingModule];

const providers = [
  {
    provide: WidgetsFacade,
    useClass: WidgetsFacadeMock,
  },
  {
    provide: WidgetCryptoCurrencyFormService,
    useValue: {
      getFormFields: jest.fn(() => [
        {
          key: 'cryptoCurrencies',
          type: 'select',
          defaultValue: ['bitcoin'],
          templateOptions: {
            label: 'Crypto Currencies',
            required: true,
            multiple: true,
            maxLength: 10,
            options: [MOCK_CRYPTO_CURRENCY_TYPE],
          },
        },
        {
          key: 'convertTo',
          type: 'select',
          defaultValue: 'usd',
          templateOptions: {
            label: 'Convert To',
            required: true,
            options: [MOCK_CURRENCY_TYPE],
          },
        },
      ]),
      getFormButtons: jest.fn(() => [
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
      ]),
    },
  },
  {
    provide: WidgetLocalStorageConfigService,
    useValue: {
      setCryptoCurrencyConfig: jest.fn(),
      getCryptoCurrencyConfig: jest.fn(() => of(MOCK_WIDGET_CONFIG)),
    },
  },
  {
    provide: WidgetsApiService,
    useValue: {
      getCryptoCurrency: jest.fn(() => of([MOCK_CRYPTO_CURRENCY])),
    },
  },
];
describe('CryptoCurrencyComponent', () => {
  let component: CryptoCurrencyComponent;
  let fixture: ComponentFixture<CryptoCurrencyComponent>;
  let widgetDataConfig: WidgetLocalStorageConfigService;
  const spyToggleFormState = jest.spyOn(
    CryptoCurrencyComponent.prototype as any,
    'toggleFormStateDisabled'
  );

  beforeEach(() => {
    fixture = createComponent<CryptoCurrencyComponent>(
      CryptoCurrencyComponent,
      providers,
      imports
    );
    component = fixture.componentInstance;
    component.timeout = 0;
    widgetDataConfig = TestBed.inject(WidgetLocalStorageConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set widget config', () => {
    const spyWidgetDataConfig = jest.spyOn(
      widgetDataConfig,
      'setCryptoCurrencyConfig'
    );
    const spyRestartLoadingData = jest.spyOn(
      CryptoCurrencyComponent.prototype as any,
      'restartLoadingWidgetData'
    );
    component.setWidgetConfig(MOCK_WIDGET_CONFIG);
    expect(component.widgetConfig).toEqual(MOCK_WIDGET_CONFIG);
    expect(spyWidgetDataConfig).toHaveBeenCalledWith(MOCK_WIDGET_CONFIG);
    expect(spyRestartLoadingData).toHaveBeenCalled();
  });
  it('should set widget config', () => {
    const spyWidgetDataConfig = jest.spyOn(
      widgetDataConfig,
      'setCryptoCurrencyConfig'
    );
    const spyRestartLoadingData = jest.spyOn(
      CryptoCurrencyComponent.prototype as any,
      'restartLoadingWidgetData'
    );
    component.setWidgetConfig(MOCK_WIDGET_CONFIG);
    expect(component.widgetConfig).toEqual(MOCK_WIDGET_CONFIG);
    expect(spyWidgetDataConfig).toHaveBeenCalledWith(MOCK_WIDGET_CONFIG);
    expect(spyRestartLoadingData).toHaveBeenCalled();
  });
  it('should cancel form', () => {
    component.model = {} as ICryptoCurrencyWidget;
    fixture.detectChanges();

    component.onCancel();
    expect(component.model).toEqual(MOCK_WIDGET_CONFIG);
    expect(spyToggleFormState).toHaveBeenCalledWith(true);
  });
  it('should enable form', () => {
    component.enableForm();
    expect(spyToggleFormState).toHaveBeenCalledWith(false);
  });
  afterEach(() => {
    fixture.destroy();
  });
});
