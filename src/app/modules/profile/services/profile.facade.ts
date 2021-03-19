import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUpdateProfile } from '../models';
import * as ProfileActions from '../state/profile.actions';
import { ProfileState } from '../state/profile.reducer';
import { profileQuery } from '../state/profile.selectors';

@Injectable()
export class ProfileFacade {
  pending$ = this.store.pipe(select(profileQuery.getPending));
  error$ = this.store.pipe(select(profileQuery.getError));

  constructor(private store: Store<ProfileState>) {}

  changePassword({ oldPassword, newPassword }) {
    this.store.dispatch(
      ProfileActions.changePassword({ oldPassword, newPassword })
    );
  }

  updateProfile(profile: IUpdateProfile) {
    this.store.dispatch(ProfileActions.updateUserProfile({ profile }));
  }
}
