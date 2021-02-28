/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthFormService } from './auth-form.service';

describe('Service: AuthForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFormService],
    });
  });

  it('should ...', inject([AuthFormService], (service: AuthFormService) => {
    expect(service).toBeTruthy();
  }));
});
