import { Injectable } from '@angular/core';
import { AuthService } from '@auth';
import { of } from 'rxjs';
import { MOCK_USER, MOCK_PROVIDERS } from './auth-data.mock';

@Injectable()
export class AuthServiceMock implements Partial<AuthService> {
  verifyPasswordResetCode = jest.fn(() => of('test@email.com'));
  verifyEmailAddress = jest.fn();
  getCurrentUser = jest.fn(() =>
    of({
      currentUser: MOCK_USER,
      providers: MOCK_PROVIDERS,
    })
  );
}
