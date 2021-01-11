import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormField, REGEXPS } from '@shared';
import { AuthFacade } from '../../services/auth.facade';

@Component({
  selector: 'app-login',
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
      },
    },
  ];
  loginModal = {};

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {}
  onSubmit(data) {
    this.authFacade.loginWithCredentials(data);
  }
  onLoginWithGoogle() {
    this.authFacade.loginWithGoogle();
  }
  onLoginWithFacebook() {
    this.authFacade.loginWithFacebook();
  }
}
