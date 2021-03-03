import { Injectable } from '@angular/core';
import { ProfileFacade } from '@modules/profile';
import { of } from 'rxjs';

@Injectable()
export class ProfileFacadeMock implements Partial<ProfileFacade> {
  pending$ = of(null);
  providers$ = of(null);

  changePassword = jest.fn();
  updateProfile = jest.fn();
}
