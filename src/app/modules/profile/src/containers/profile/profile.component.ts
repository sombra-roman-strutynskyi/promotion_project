import { Component } from '@angular/core';
import { AuthFacade } from '@auth';
import { isEmptyObject } from '@shared';
import { filter } from 'rxjs/operators';
import { UpdateProfile } from '../../models';
import { ProfileFacade } from '../../services';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  pending$ = this.profileFacade.pending$;
  providerType$ = this.authFacade.providerType$;
  currentUser$ = this.authFacade.currentUser$.pipe(
    filter((d) => !isEmptyObject(d))
  );

  constructor(
    private profileFacade: ProfileFacade,
    private authFacade: AuthFacade
  ) {}

  updateUserProfile(userInfo) {
    const profile = new UpdateProfile(userInfo);
    console.log(profile);

    this.profileFacade.updateProfile(profile);
  }
  updateUserPassword(password) {
    this.profileFacade.changePassword(password);
  }
}
