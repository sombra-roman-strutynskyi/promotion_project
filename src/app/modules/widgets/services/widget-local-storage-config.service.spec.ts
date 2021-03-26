import { TestBed } from '@angular/core/testing';
import { AuthFacade } from '@auth';
import { AuthFacadeMock, MOCK_WIDGET_CONFIG } from '@testing';
import { WidgetLocalStorageConfigService } from './widget-local-storage-config.service';

describe('WidgetLocalStorageConfigService', () => {
  let service: WidgetLocalStorageConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WidgetLocalStorageConfigService,
        {
          provide: AuthFacade,
          useClass: AuthFacadeMock,
        },
      ],
    });
    service = TestBed.inject(WidgetLocalStorageConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set crypto currency config', () => {
    const spy = jest.spyOn(
      WidgetLocalStorageConfigService.prototype as any,
      'setUserWidgetsConfig'
    );

    service.setCryptoCurrencyConfig(MOCK_WIDGET_CONFIG);
    expect(spy).toHaveBeenCalledWith({
      cryptoCurrencyWidget: MOCK_WIDGET_CONFIG,
    });
  });
  it('should get crypto currency config', (done) => {
    service.getCryptoCurrencyConfig().subscribe((data) => {
      expect(data).toEqual({ cryptoCurrencies: ['bitcoin'], convertTo: 'usd' });
      done();
    });
  });
});
