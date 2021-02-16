import { TestBed } from '@angular/core/testing';

import { WidgetLocalStorageConfigService } from './widget-local-storage-config.service';

describe('WidgetLocalStorageConfigService', () => {
  let service: WidgetLocalStorageConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetLocalStorageConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
