import { TestBed } from '@angular/core/testing';

import { WidgetsApiService } from './widgets-api.service';

describe('WidgetsApiService', () => {
  let service: WidgetsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
