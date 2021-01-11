import { Component } from '@angular/core';
import { IFormField, REGEXPS } from '@shared';
import { RegisterUser } from '../../models';
import { AuthFacade } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  fields: IFormField[] = [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
      syncValidator: {
        required: true,
      },
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'text',
      syncValidator: {
        required: true,
      },
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      syncValidator: {
        required: true,
        pattern: REGEXPS.email,
      },
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      syncValidator: {
        required: true,
      },
    },
  ];
  registerModal = {};
  constructor(private authFacade: AuthFacade) {}

  onSubmit(user: RegisterUser) {
    this.authFacade.register(user);
  }
}
