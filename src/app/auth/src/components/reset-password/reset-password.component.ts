import { Component } from '@angular/core';
import { AuthFacade } from '../../services';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {

  resetPasswordModal = {};
  constructor(private authFacade: AuthFacade) {}

  onSubmit({ email }) {
    this.authFacade.resetPassword(email, '');
  }
}
