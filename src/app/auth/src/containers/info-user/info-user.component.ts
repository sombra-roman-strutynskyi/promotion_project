import { Component } from '@angular/core';
import { AuthFacade } from '../../services';

@Component({
  selector: 'user-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss'],
})
export class InfoUserComponent {
  currentUser$ = this.authFacade.currentUser$;
  pending$ = this.authFacade.pending$;

  constructor(private authFacade: AuthFacade) {}

  updateUserProfile(userInfo) {
    this.authFacade.updateProfile(userInfo);
  }
  updateUserPassword(password) {
    this.authFacade.changePassword(password);
  }
  updateUserAvatar(file: File) {
    this.authFacade.uploadUserAvatar(file);
  }
}
