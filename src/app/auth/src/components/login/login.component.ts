import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFormField, REGEXPS } from '@shared';

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

  constructor() {}

  ngOnInit() {
  }
  onSubmit(data) {
    console.log(data);
    
  }
}
