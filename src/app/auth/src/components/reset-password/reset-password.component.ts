import { Component } from '@angular/core';
import { IFormField, REGEXPS } from '@shared';
import { AuthFacade } from '../../services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  fields: IFormField[] = [
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      syncValidator: {
        required: true,
        pattern: REGEXPS.email,
      },
    },
  ];
  resetPasswordModal = {};
  constructor(private authFacade: AuthFacade) {}

  onSubmit({ email }) {
    this.authFacade.resetPassword(email, '');
  }
}
