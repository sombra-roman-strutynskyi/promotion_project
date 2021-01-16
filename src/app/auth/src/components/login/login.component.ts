import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormField, REGEXPS } from '@shared';
import { Credentials } from '../../models';
import { AuthFacade } from '../../services/auth.facade';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      syncValidator: {
        required: true,
        minLength: 6,
      },
    },
    {
      key: 'remember',
      label: 'Remember Me',
      type: 'checkbox',
    },
  ];
  loginModel = {};

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {}
  onSubmit(data: Credentials) {
    console.log(data);

    this.authFacade.loginWithCredentials(data);
  }
  onLoginWithGoogle() {
    this.authFacade.loginWithGoogle();
  }
  onLoginWithFacebook() {
    this.authFacade.loginWithFacebook();
  }
}
