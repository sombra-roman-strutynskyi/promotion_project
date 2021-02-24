import { Component } from '@angular/core';
import { AuthFacade } from '@auth';
import { isEmpty } from 'lodash';
import { filter, map } from 'rxjs/operators';
import { UpdateProfile } from '../../models';
import { ProfileFacade } from '../../services';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  pending$ = this.profileFacade.pending$;
  showChangePassword$ = this.authFacade.providers$.pipe(
    map(({ password }) => password)
  );
  currentUser$ = this.authFacade.currentUser$.pipe(filter((d) => !isEmpty(d)));

  constructor(
    private profileFacade: ProfileFacade,
    private authFacade: AuthFacade
  ) {}

  updateUserProfile(userInfo) {
    const profile = new UpdateProfile(userInfo);
    this.profileFacade.updateProfile(profile);
  }
  updateUserPassword(password) {
    this.profileFacade.changePassword(password);
  }
}
